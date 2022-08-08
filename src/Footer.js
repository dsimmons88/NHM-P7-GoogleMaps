import React, { Component } from 'react';
import './App.css';

export default class Footer extends Component{
  render(){
    return (
      <div className="App-footer">
        {<p className="footerText">This map uses infomation from the FoursquareAPI.</p>}
      </div>

    );

  }
}
