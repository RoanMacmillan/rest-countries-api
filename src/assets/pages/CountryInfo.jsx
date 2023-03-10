import React from "react";
import { useState, useEffect } from "react";
import "./CountryInfo.css";
import { useParams, Link } from "react-router-dom";
const CountryInfo = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v2/alpha/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
        if (data.borders.length > 0) {
          Promise.all(
            data.borders.map((border) =>
              fetch(`https://restcountries.com/v2/alpha/${border}`).then(
                (response) => response.json()
              )
            )
          )
            .then((borders) => {
              setBorderCountries(borders);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!country) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    );
  }

  // extracts different langauges into an array
  const languages = country.languages.map((language) => language.name);

  return (
    <div className="countryInfo">
      <div className="btnWrapper">
        <Link to="/">
          <button type="button" className="backBtn">
            Back
          </button>
        </Link>
      </div>

      <div className="desktopWrapper">
        <div className="flagWrapper">
          <img src={country.flag} alt={`${country.name} flag`} />
        </div>
        <div className="desktopInfoWrapper">
          <div className="contentContainer">
            <div className="topInfo">
              <h1>{country.name}</h1>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p>Sub Region: {country.subregion} </p>
              <p>Capital: {country.capital}</p>
            </div>

            <div className="bottomInfo">
              <p>Top Level Domain: {country.topLevelDomain}</p>
              {country.currencies.map((currency) => (
                <p key={currency.code}>Currency: {currency.name}</p>
              ))}
              {/* joins language array elements into comma-separated string */}
              <p>Languages: {languages.join(", ")}</p>
            </div>
          </div>
          <div className="borderContainer">
            <h2>Border Countries:</h2>

            <div className="borderCountries">
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((border) => (
                  <Link to={`/countries/${border}`} key={border}>
                    <button type="button">{border}</button>
                  </Link>
                ))
              ) : (
                <p>No bordering countries found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;
