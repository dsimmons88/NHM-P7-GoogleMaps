import React, { Component } from 'react';
import './App.css';

import { load_google_maps , load_places } from './utils'
import App from './App';


class MapSidebar extends Component {


venueItemClick = venue => {
  console.log(venue);
  let markers = this.props.pins.filter(m => m.id === venue.id);

//  this.props.map.setCenter(venue.location.lat, venue.location.lng);
  // 1 seconds after the center of the map has changed, pan back to the
  // marker.
  //window.setTimeout(() => {
  //  this.props.map.panTo(venue.location.lat, venue.location.lng);
//  }, 1000);

  // sets the content for the infowindow
  this.props.infowindow.setContent(venue.name);
  // if you click the marker the infowindow will open
  this.props.pins.forEach(pin => {
    if (pin.id === venue.id) {
      this.props.infowindow.open(this.props.map, pin);
      // set animation for the click for item list
      if (pin.getAnimation() !== null) {
        pin.setAnimation(null);
      } else {
        pin.setAnimation(this.props.google.maps.Animation.BOUNCE);
      }
      setTimeout(() => {
        pin.setAnimation(null);
      }, 1000);
    }
  });
};




/*
//  this is a the function for the onClick for the list item
venueItemClick = venues => {
  let markers = this.props.pins.filter(m => m.id === marker.id)
  this.state.map.setZoom(15);
  this.state.map.setCenter(marker.getPosition());
  // 1 seconds after the center of the map has changed, pan back to the
  // marker.
  window.setTimeout( () => {
  this.state.map.panTo(marker.position);
}, 1000)


// sets the content for the infowindow
  this.state.infowindow.setContent(marker.name);
  // if you click the marker the infowindow will open
  this.state.infowindow.open(this.props.map, marker);
// set animation for the click for item list
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(this.state.google.maps.Animation.BOUNCE);
  }
  setTimeout(() => { marker.setAnimation(null); }, 1000);
}


/*
// a function to filter the markers to match the query
  filterMarkers = (query) => {

    if(this.state.query === ""){
    this.setState({filterMarkers: this.props.venes})
  }

// this is for the filter list.
let l = this.props.pins.filter(marker => marker.name.toLowerCase().includes(query.toLowerCase()));
// this sort the markers to match the query
      this.props.pins.forEach(marker => {
      if (marker.name.toLowerCase().includes(query.toLowerCase()) === true )
      {marker.setVisible(true);
     //searchMarkers.push(marker);


      } else {
      marker.setVisible(false)

    }



    });
// to update the query state
    this.setState({ query });
// to update the filter list state
  this.setState({filterMarkers: l})
  //  console.log(filterMarkers);
  }

*/

render () {
  return (
    <div>

    <div id="sidebar">

      <input type="text" value={this.props.query}
      onChange={ (e) => {this.props.filterMarkers(e.target.value) }} />

      <br/>

      {

        this.props.searchedVenues &&
        this.props.searchedVenues.length > 0 &&
        this.props.searchedVenues.map((marker, index) => (
          <div key={index} className="venue-item"
          onClick={() => {this.venueItemClick(marker)}}>
          {marker.name}
          <br/>
          {marker.address}
          </div>
        ))
      }
      </div>

    </div>
);
}






}

export default MapSidebar;
