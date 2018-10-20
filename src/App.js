import React, { Component } from 'react';
import './App.css';

import { load_google_maps , load_places } from './utils'

class App extends Component {
  componentDidMount() {
    let promiseGM = load_google_maps();
    let promisePlaces = load_places();

    Promise.all([
      promiseGM,
      promisePlaces
    ])
    .then(results => {

    let google = results[0];
    let venues = results[1].response.venues;
    this.google = google;
    this.markers =[];

console.log(venues);
console.log(google);
    })

  }

  render() {
    return (
      <div id="map">

      </div>
    );
  }
}

export default App;
