import React, { Component } from 'react';
import './App.css';

import { load_google_maps , load_places } from './utils'
import App from './App';


class MapSidebar extends Component {

    state = {
      query: '',

    }

filterMarkers(query) {
  this.props.pins.forEach(markers => {
    console.log(markers);
  });
}

render () {
  return (
    <div>
    <div id="sidebar">

      <input type="text" value={this.state.query} onChange={ (e) => {this.filterMarkers(e.target.value)} } />
      </div>
    </div>

);
}






}

export default MapSidebar;
