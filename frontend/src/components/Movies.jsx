import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { paginate } from "../utils/Paginate";
import { getMovies, deleteMovie } from "./../services/MovieService";
import { getGenres } from "../services/GenreService";
import _ from "lodash";

import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import Search from "./common/Search";

export default class Movies extends Component {
  state = {
    sortColumn: {
      path: "title",
      order: "asc"
    },
    movies: [],
    genres: [],
    currPage: 1,
    pageSize: 4,
    selectedGenre: null,
    searchQuery: ""
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All genres", _id: "" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ genres, movies });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.findIndex(m => m._id === movie._id);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      sortColumn,
      selectedGenre,
      searchQuery,
      currPage,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, sortColumn, currPage, genres, searchQuery } = this.state;
    const { user } = this.props.user;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={this.state.selectedGenre}
            onItemChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          {user && (
            <Link className="btn btn-primary m-2" to="/movies/new">
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in db</p>
          <Search value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currPage={currPage}
          />
        </div>
      </div>
    );
  }
}
