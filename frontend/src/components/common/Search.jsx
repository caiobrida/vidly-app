import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <input
      className="form-control my-3"
      name="query"
      value={value}
      type="text"
      placeholder="Search..."
      onChange={e => onChange(e.currentTarget.value)}
    ></input>
  );
};

export default Search;
