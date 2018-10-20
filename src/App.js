import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { load_google_maps , load_places } from './utils'

class App extends Component {
  componentDidMount() {
    let promiseGM = load_google_maps();
    let promisePlaces = load_places();

    Promise.all([
      [promiseGM, promisePlaces]
    ]).then(values => {
      console.log(values);
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
