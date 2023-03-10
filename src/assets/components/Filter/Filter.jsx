import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ onFilterChange, regionOptions }) => {
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleFilterChange = (event) => {
    setSelectedRegion(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <div className="filterContainer">
      <label htmlFor='filter'></label>
      <select aria-label="filter" id="filter" value={selectedRegion} onChange={handleFilterChange}>
        <option value="">Filter by Region</option>

        {regionOptions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
