import React, { Component, PropTypes, } from 'react';
import ReactDOM, { render, } from 'react-dom';
// import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import KanbanBoard from './KanbanBoard';
// import cardsList from './cardslist';

class AnimatedShoppingList extends Component {
  constructor() {
    super();
    this.state = {
      items: [{
        id: 1,
        name: 'Milk',
      }, {
        id: 2,
        name: 'Yogurt',
      }, {
        id: 3,
        name: 'Orange Juice',  
      }],
    };
  }

  //Called when the user changes the input field
  handleChange( evt ){
    if ( evt.key === 'Enter' ) {
      let newItem = { id: Date.now(), name: evt.target.value, };
      let newItems = this.state.items.concat( newItem );
      evt.target.value = '';
      this.setState( { items: newItems, });
    }
  }  

  handleRemove( i ) {
    var newItems = this.state.items;
    newItems.splice( i, 1 );
    this.setState({ items : newItems, });
  }

  // componentDidMount() {
  //   fetch('./contacts.json')
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       this.setState({ contacts: responseData, });
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching and parsing data', error);
  //     });
  // }

  render() {
    let shoppingItems = this.state.items.map(( item, i ) => {
      return ( <div key={item.id} className="item" onClick={this.handleRemove.bind( this, i ) }>
        {item.name}
      </div> );
    });
    return ( <div>
      <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionAppear={true} transitionAppearTimeout={300} >
        {shoppingItems}
      </ReactCSSTransitionGroup>  
      <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)} />
    </div> );
  }
}

render(
    <AnimatedShoppingList />,
    document.querySelector('#root')
);
//https://github.com/pro-react/kanban-app/tree/chapter1