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






  filterMarkers(query) {

    let searchMarkers = [];

      this.props.pins.forEach(marker => {
      if (marker.name.toLowerCase().includes(query.toLowerCase()) === true )
      {marker.setVisible(true);
     searchMarkers.push(marker);


      } else {
      marker.setVisible(false)
    }



    });

    this.setState({ query });

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
          <div key={index} className="venue-item">
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
