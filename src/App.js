import './App.css';
import axios from 'axios';
import NavBar from './components/NavBar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import { Route } from 'react-router-dom';
import React, { Component } from 'react';

class App extends Component {
  state = {
    allCountries: [],
  };

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        this.setState({
          allCountries: response.data,
        });
      })
      .catch(() => {
        console.log('error in mounting');
      });
  }
  render() {
    return (
      <div className="container">
        <NavBar />
        <div className="row align-items-start">
          <div className="col">
            <CountriesList allCountries={this.state.allCountries} />
          </div>
          <div className="col">
            <Route path="/country/:alpha3Code" component={CountryDetails} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
