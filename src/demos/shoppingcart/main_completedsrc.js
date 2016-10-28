import React, { Component, } from 'react';
import { render, } from 'react-dom';
import Container from './Container';

class App extends Component {
  render() {
    return ( <Container /> );
  }
}

render(
    <App />,
    document.querySelector('#root')
);
//https://github.com/pro-react/kanban-app/tree/chapter1