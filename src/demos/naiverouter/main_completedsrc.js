import React, { Component, } from 'react';
import { render, } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory, } from 'react-router';
import About from './About';
import Home from './Home';
import Repos from './Repos';
import RepoDetails from './RepoDetails';
import 'whatwg-fetch';
import 'babel-polyfill';

class App extends Component {
  // constructor() {
  //   super(...arguments);
  //   this.state = {
  //     route: window.location.hash.substr(1),
  //   };
  // }
  // componentDidMount() {
  //   window.addEventListener('hashchange', () => {
  //     this.setState({
  //       route: window.location.hash.substr(1),
  //     });
  //   });
  // }
  render() {
    // let Child;
    // switch (this.state.route) {
    //   case '/about': Child = About; break;
    //   case '/repos': Child = Repos; break;
    //   default: Child = Home;
    // }
    return ( 
      <div>
        <header>App</header>
        <menu>
          <ul>
            <li><Link to="/naiverouter/about" activeClassName="active">About</Link></li>
            <li><Link to="/naiverouter/repos" activeClassName="active">Repos</Link></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
      );
  }
}


render(
  (<Router history={browserHistory}>
    <Route path="/naiverouter" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About}/>
      <Route path="repos" component={Repos}>
        <Route path="details/:repo_name" component={RepoDetails}/>
      </Route>
    </Route>
  </Router>),
    document.querySelector('#root')
);
//https://github.com/pro-react/kanban-app/tree/chapter1