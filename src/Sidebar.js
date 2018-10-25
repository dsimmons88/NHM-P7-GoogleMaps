import React, { Component } from 'react';
import './App.css';

import { load_google_maps , load_places } from './utils'


class sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: ''

    }
  }
render(
  return {
    <div>
    <div id="sidebar" />

      <input type="text" value={this.state.query} onChange={ (e) => {this.filterMarkers(e.target.value)} } />
      </div>
  };
)





}
