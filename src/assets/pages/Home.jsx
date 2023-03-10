import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import CountryCard from "../components/CountryCard/CountryCard";
import "./Home.css";
import Filter from "../components/Filter/Filter";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasResults, setHasResults] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const regionOptions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    setIsLoading(true); // sets loading state before fetching data
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setIsLoading(false); // sets loading state to false after data is fetched
      });
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredCountries(filtered);
    setHasResults(filtered.length > 0);
  };

  const handleFilterChange = (region) => {
    if (region === "") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(
        (country) => country.region.toLowerCase() === region.toLowerCase()
      );

      setFilteredCountries(filtered);
    }
  };

  return (
    <main>
      <div className="searchFilterContainer">
        <SearchBar onSearch={handleSearch} />
        <Filter
          onFilterChange={handleFilterChange}
          regionOptions={regionOptions}
        />
      </div>

      {isLoading ? ( // check loading state before rendering content
        <div className="loadingContainer">
          <span className="loader"></span>
        </div>
      ) : hasResults ? (
        <CountryCard countries={filteredCountries} />
      ) : (
        <div className="errorContainer">
          <p className="errorMsg">No countries found</p>
        </div>
      )}
    </main>
  );
};

export default Home;
