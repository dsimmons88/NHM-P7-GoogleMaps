import React, { Component } from 'react';
import './App.css';

import MapSidebar from './Sidebar'
import { load_google_maps , load_places } from './utils'
import HeaderC from './Header'
import Footer from './Footer'
import {
  Checkbox,
  Grid,
  Header,
  Image,
  Menu,
  Ref,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      query : "",
      pins: "",
      venues: "",
      map: null,
      infowindow: null,
      google: "",
      filterMarkers: "",
      searchedVenues: []
    }
  }

  componentDidMount() {
window.gm_authFailure = () => {
  alert("googlemaps has not loaded")
}
// var for the google maps fucntion. This will create the map
    let promiseGM = load_google_maps();
// car for the foursquare API venue function. This will get an locations json
    let promisePlaces = load_places();
// this creates an promise for the google maps and foursquare venues

    Promise.all([
      promiseGM,
      promisePlaces
    ],function(err){
        console.log("Google map");
    })
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
  },(err) => {
        console.log("Google maps info did not load");
    });

  //function gm_authFailure() { /* Code */ };
// var for the markers
  const pins = [];
// sets the infowindow to a varible
  var infowindow = new google.maps.InfoWindow();
// I used the array for the venues to create markers for the google maps
venues.forEach(venue => {
  var marker = new google.maps.Marker({
    position:{lat: venue.location.lat, lng: venue.location.lng},
    map: map,
    venues: venue,
    name: venue.name,
    animation: google.maps.Animation.DROP,
    title: venue.name,
    address: venue.location.address,
    id: venue.id

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
      map.setCenter(marker.getPosition());
      // 1 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout( () => {
      map.panTo(marker.position);
    }, 1000)
    // sets the content for the infowindow
      infowindow.setContent(venue.name);
      // if you click the marker the infowindow will open
      infowindow.open(map, marker);
    }
  );
})
// this sets the state of the venues, map InfoWindow,filterMarkers
this.setState({ venues });
this.setState({map: map});
this.setState({infowindow: infowindow,
              filterMarkers: venues
            });
this.setState({google: google});

console.log(venues);
console.log(google);
    })
  }
  // a function to filter the markers to match the query
    filterMarkers = query => {
  // this is for the filter list.
  let l = this.state.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
  // this sort the markers to match the query
        this.state.pins.forEach(marker => {
        if (marker.name.toLowerCase().includes(query.toLowerCase()) === true )
        {marker.setVisible(true);
       //searchMarkers.push(marker);
        } else {
        marker.setVisible(false)
      }
    });
  // to update the query state
  //    this.setState({ query });
  // to update the filter list state
    this.setState({filterMarkers: l})
    //  console.log(filterMarkers);
    }
//const [visible, setVisible] = React.useState(false)

  render() {
    return (
      <div>
        <HeaderC className= "App-header" />
        <div id="map" />
        <label
          role="application"
          aria-label="Map of Breweries around the Raleigh NC area"
        />
        <MapSidebar
          searchedVenues={this.state.filterMarkers}
          filterMarkers={this.filterMarkers}
          pins={this.state.pins}
          venues={this.state.venues}
          map={this.state.map}
          infowindow={this.state.infowindow}
          google={this.state.google}
        />
        <Footer className="App-footer" text="Google Maps and Foursquare API 2018" title="Google Maps and Foursquare API 2018" />
      </div>
    );
  }
}

export default App;
