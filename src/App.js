import React, { Component } from 'react';
import './App.css';

import MapSidebar from './Sidebar'
import { load_google_maps , load_places } from './utils'

class App extends Component {




  constructor(props) {
    super(props);

    this.state = {
      query : "",
      pins: ""



    }
  }





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




    var myLatLng = {lat: venues[0].location.lat, lng: venues[0].location.lng };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  });

  const pins = [];

  var infowindow = new google.maps.InfoWindow();

venues.forEach(markers => {
  var marker = new google.maps.Marker({
    position:{lat: markers.location.lat, lng: markers.location.lng},
    map: map,
    name: markers.name,
    animation: google.maps.Animation.DROP,
    title: markers.name,
    id: markers.id
  });

  pins.push(marker);

  this.setState({
        pins: pins
      });
  console.log(pins);



  google.maps.event.addListener(marker, 'mouseover', () =>{

        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        setTimeout(() => { marker.setAnimation(null); }, 1000);
      }
  );






  marker.addListener('click', () => {




      map.setZoom(15);
      map.setCenter(marker.getPosition());
      // 1 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout( () => {
      map.panTo(marker.position);
    }, 1000)
      infowindow.setContent(markers.name);
      infowindow.open(map, marker);

    }

  );



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
      <div>

      <div id="map" />

      <MapSidebar pins={this.state.pins} />




      </div>
    );
  }
}

export default App;
