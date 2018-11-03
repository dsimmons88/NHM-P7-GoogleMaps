import React, { Component } from 'react';
import './App.css';

export default class Header extends Component{


   hamburger = (x) => {
      x.classList.toggle("change");
  }

    render() {
      return (
        <div className="App-header">
          <h3 className="headerTitle">Simple SPA</h3>
          <div class="container" onclick="myFunction(this)">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div>
        </div>


      );
    }
  }
