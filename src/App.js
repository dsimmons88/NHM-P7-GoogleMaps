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
    zoom: 12,
    center: myLatLng
  });
this.map = map;


  var infowindow = new google.maps.InfoWindow();

venues.forEach(markers => {
  var marker = new google.maps.Marker({
    position:{lat: markers.location.lat, lng: markers.location.lng},
    map: this.map,
    animation: google.maps.Animation.DROP,
    title: markers.name,
    id: markers.id
  });
  google.maps.event.addListener(marker, 'mouseover', () =>{

        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
  );

  marker.addListener('click', () => {
    window.setTimeout(function() {
    map.panTo(marker.position);
  }, 3000)


      this.map.setZoom(15);
      this.map.setCenter(markers.position);
      infowindow.setContent(markers.name);
      infowindow.open(map, marker);
    }

  );

    this.markers.push(markers);
    console.log(this.markers);
    /*let infoContent = {
      Name: markers.name
      Address:
      picture:
    }
    */
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
