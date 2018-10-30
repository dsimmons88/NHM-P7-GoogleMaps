import React, { Component } from 'react';
import './App.css';

import MapSidebar from './Sidebar'
import { load_google_maps , load_places } from './utils'

class App extends Component {




  constructor(props) {
    super(props);

    this.state = {
      query : "",
      pins: "",
      venues: ""


    }
  }





  componentDidMount() {



// var for the google maps fucntion. This will create the map
    let promiseGM = load_google_maps();
// car for the foursquare API venue function. This will get an locations json
    let promisePlaces = load_places();
// this creates an promise for the google maps and foursquare venues

    Promise.all([
      promiseGM,
      promisePlaces
    ])
// After the promise we get the results for the google maps and venues
    .then(results => {

    let google = results[0];
    let venues = results[1].response.venues;
    this.google = google;

// this is to get the center for your google maps

    var myLatLng = {lat: venues[0].location.lat, lng: venues[0].location.lng };
// this is to create the map element
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  });
// var for the markers
  const pins = [];
// sets the infowindow to a varible
  var infowindow = new google.maps.InfoWindow();
// I used the array for the venues to create markers for the google maps
venues.forEach(markers => {
  var marker = new google.maps.Marker({
    position:{lat: markers.location.lat, lng: markers.location.lng},
    map: map,
    venues: markers,
    name: markers.name,
    animation: google.maps.Animation.DROP,
    title: markers.name,
    id: markers.id
  });
// this moves the markers to the pins array
  pins.push(marker);
// this sets the state for the pins array
  this.setState({
        pins: pins
      });
  console.log(pins);


// When you mouseover an marker, it will bounce
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

    // sets the content for the infowindow
      infowindow.setContent(markers.name);
      // if you click the marker the infowindow will open
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
// this sets the state of the venues
this.setState({ venues })

console.log(venues);
console.log(google);
    })

  }







  render() {
    return (
      <div>

      <div id="map" />

      <MapSidebar pins={this.state.pins} venues={this.state.venues}/>




      </div>
    );
  }
}

export default App;
