import React from "react";
import "./CountryCard.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const CountryCard = ({ countries }) => {


  return (
    <div className="countryContainer">
      {countries.map((country) => (
        <Link to={`/countries/${country.alpha3Code}`} key={country.alpha3Code}>
        <div
          className="countryCard"
          key={country.alpha3Code}
          
        >
          <div className="imgContainer">
            <img src={country.flag} alt={`Flag of ${country.name}`} />
          </div>

          <div className="infoContainer">
            <h2>{country.name}</h2>
            <span>
              Population: <p>{country.population}</p>
            </span>
            <span>
              Region: <p>{country.region}</p>
            </span>
            <span>
              Capital: <p>{country.capital}</p>
            </span>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default CountryCard;
