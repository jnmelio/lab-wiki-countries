import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CountryDetails extends Component {
  state = {
    countryDetail: null,
  };
  getCountryDetails = () => {
    let countryCode = this.props.match.params.alpha3Code;
    axios
      .get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
      .then((response) => {
        let detail = {
          name: response.data.name,
          capital: response.data.capital,
          area: response.data.area,
          borders: response.data.borders,
          //   code: this.props.match.params.alpha3Code,
        };
        this.setState({
          countryDetail: detail,
        });
      })
      .catch(() => {
        console.log('mounted details failed');
      });
  };
  componentDidMount() {
    this.getCountryDetails();
  }

  componentDidUpdate() {
    console.log('oopsie');
    let stateCode = this.state.countryDetail.alpha3Code;
    let propsCode = this.props.match.params.alpha3Code;
    if (stateCode !== propsCode) {
      this.getCountryDetails();
    }
  }

  render() {
    const { countryDetail } = this.state;
    if (!countryDetail) {
      return <h2>The country details are loading. Please wait.</h2>;
    }
    return (
      <div>
        <h1>{countryDetail.name}</h1>
        <p>Capital {countryDetail.capital}</p>
        <p>Area {countryDetail.area}</p>
        <ul>
          Borders
          <li>
            {countryDetail.borders.map((border) => {
              return (
                <div>
                  <Link to={`/country/${border.alpha3Code}`}>{border}</Link>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  }
}

export default CountryDetails;
