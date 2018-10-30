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





// a function to filter the markers to match the query
  filterMarkers(query) {
// this is for the filter list.
    let searchMarkers = [];
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
      // this creates the search result in the filter list
      {
        // this checks the state of searchMarkers and outputs the results in the filter list
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
