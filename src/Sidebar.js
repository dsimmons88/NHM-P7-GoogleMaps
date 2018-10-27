import React, { Component } from 'react';
import './App.css';

import { load_google_maps , load_places } from './utils'
import App from './App';


class MapSidebar extends Component {

state = {
  query: ""
}


  filterMarkers(query) {
      this.props.pins.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
      marker.setVisible(true)  :
      marker.setVisible(false)
    });
    this.setState({ query });
  }




render () {
  return (
    <div>

    <div id="sidebar">

      <input type="text" value={this.state.query} onChange={ (e) => {this.filterMarkers(e.target.value) }} />
      </div>

    </div>
);
}






}

export default MapSidebar;
