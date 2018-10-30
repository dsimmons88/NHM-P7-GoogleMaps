import React, { Component } from 'react';
import './App.css';

import { load_google_maps , load_places } from './utils'
import App from './App';


class MapSidebar extends Component {
constructor(props){
  super(props);
  this.state = {
    query: "",
    searchMarkers:""
  }



}



//  this is a the function for the onClick for the list item
venueItemClick = (marker) => {
  let markers = this.props.pins.filter(m => m.id === marker.id)
  this.props.map.setZoom(15);
  this.props.map.setCenter(marker.getPosition());
  // 1 seconds after the center of the map has changed, pan back to the
  // marker.
  window.setTimeout( () => {
  this.props.map.panTo(marker.position);
}, 1000)


// sets the content for the infowindow
  this.props.infowindow.setContent(marker.name);
  // if you click the marker the infowindow will open
  this.props.infowindow.open(this.props.map, marker);
// set animation for the click for item list
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
  }
  setTimeout(() => { marker.setAnimation(null); }, 1000);
}




// a function to filter the markers to match the query
  filterMarkers = (query) => {
// this is for the filter list.
const searchMarkers = [];
// this sort the markers to match the query
      this.props.pins.forEach(marker => {
      if (marker.name.toLowerCase().includes(query.toLowerCase()) === true )
      {marker.setVisible(true);
     searchMarkers.push(marker);


      } else {
      marker.setVisible(false)

    }



    });
// to update the query state
    this.setState({ query });
// to update the filter list state
  this.setState({searchMarkers: searchMarkers})
  //  console.log(filterMarkers);
  }



render () {
  return (
    <div>

    <div id="sidebar">

      <input type="text" value={this.state.query} onChange={ (e) => {this.filterMarkers(e.target.value) }} />

      <br/>

      {

        this.state.searchMarkers && this.state.searchMarkers.length > 0 && this.state.searchMarkers.map((marker, index) => (
          <div key={index} className="venue-item" onClick={() => {this.venueItemClick(marker)}}>
          {marker.name}
          </div>
        ))
      }
      </div>

    </div>
);
}






}

export default MapSidebar;
