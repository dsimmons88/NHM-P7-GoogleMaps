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
    zoom: 4,
    center: myLatLng
  });

    venues.forEach(venues => {
      let marker = new google.maps.Marker({
    position: { lat: venue.location.lat, lng:venue.location.lng },
    map: this.map,
    venue: venue,
    id: venue.id,
    name: venue.name,
    animation: google.maps.Animation.DROP
  });
    })

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
