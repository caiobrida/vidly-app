import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/NavBar";
import Routes from "./routes";
import auth from "./services/AuthService";

import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <main className="container">
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Routes users={this.state} />
      </main>
    );
  }
}

export default App;
