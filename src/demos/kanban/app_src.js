import React from 'react';
import ReactDOM, { render, } from 'react-dom';
import { Router, Route, /* Link, IndexRoute,*/ browserHistory, hashHistory, } from 'react-router';
import KanbanBoardContainer from './KanbanBoardContainer';
import KanbanBoard from './KanbanBoard';
import EditCard from './EditCard';
import NewCard from './NewCard';

render((
    <Router history={hashHistory}>
    <Route component={KanbanBoardContainer}>
      <Route path="/" component={KanbanBoard}>
        <Route path="new" component={NewCard}/>
        <Route path="edit/:card_id" component={EditCard}/>
      </Route>  
    </Route>
    </Router>),
  document.querySelector('#root')
);

//https://github.com/pro-react/kanban-app/tree/chapter1
