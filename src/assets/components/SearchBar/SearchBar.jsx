import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "../../images/search.svg";
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="searchBar">
      <img src={SearchIcon} alt="Search Icon"></img>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
