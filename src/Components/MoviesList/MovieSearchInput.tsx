import React, { useState } from "react";

interface MovieSearchInputProps {
  onSearch: (query: string) => void;
}

const MovieSearchInput: React.FC<MovieSearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.length > 2) {
      onSearch(query);
    } else {
      alert("Query is too short. Please enter at least 3 characters.");
    }
  };

  return (
    <form className="flex p-2 m-2" onSubmit={handleSearch}>
      <input
        className="form-control mr-4"
        value={query}
        onChange={handleInputChange}
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
};

export default MovieSearchInput;
