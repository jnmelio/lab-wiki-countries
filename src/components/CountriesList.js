import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CountriesList extends Component {
  render() {
    const { allCountries } = this.props;
    if (!allCountries.length) {
      return <h2>The list is loading. Please wait.</h2>;
    }
    return (
      <div>
        <div>
          {allCountries.map((country, index) => {
            return (
              <div key={index}>
                <ul className="list-group">
                  <li className="list-group-item list">
                    <Link to={`/country/${country.alpha3Code}`}>
                      {country.name}
                    </Link>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CountriesList;
