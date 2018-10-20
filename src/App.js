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

    var myLatLng = {lat: venues[0].location.lat, lng: venues[0].location.lng };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9.5,
    center: myLatLng
  });

venues.forEach(markers => {
  var marker = new google.maps.Marker({
    position:{lat: markers.location.lat, lng: markers.location.lng},
    map: map,
    title: 'Hello World!'
  });

})

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });

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
