import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import CountryCard from "../components/CountryCard/CountryCard";
import "./Home.css";
import Filter from "../components/Filter/Filter";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const regionOptions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      });
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredCountries(filtered);
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

      <CountryCard countries={filteredCountries} />
    </main>
  );
};

export default Home;
