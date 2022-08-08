import React, { Component } from 'react';
import './App.css';
import { Header, Icon } from 'semantic-ui-react'

export default class HeaderC extends Component{

    render() {
      return (
        <div>
          <Header as="h2" block>
            <Header.Content >
            <Icon name='beer' />
            Raleigh Breweries
            </Header.Content>
          </Header>
        </div>
      );
    }
  }
