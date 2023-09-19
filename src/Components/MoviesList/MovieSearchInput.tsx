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
    <div>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleInputChange}
        className="placeholder-black text-black"
      />
      <button
        className="text-gray-400 p-1 hover:rounded-full m-2 hover:bg-stone-700"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default MovieSearchInput;
