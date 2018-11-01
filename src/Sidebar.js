import React, { Component } from 'react';
import './App.css';





class MapSidebar extends Component {


venueItemClick = venue => {
  console.log(venue);



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
