import React, { Component, PropTypes, } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants';

//SHopingCart DND Spec
//a plain object implementing the drop target specification
//droptarget methods (all optional)
//drop: caleld when a compatible item is dropped
//hover: called when an item is hovered over the componet
//canDrop: use it to specify whether the drop trager is able to accept the item
const ShoppingCartSpec = {
  drop() {
    return { name: 'ShoppingCart', };
  },
};

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
};

//ShoppingCart droptarget - collect
//connect: an instance of DropTargetConncetor, it can be uysed to assign the dorp target role to a DOM now
//monitor: an instance of DropTargetMonitor - you use it to connect state from the react dnd to props, availble functions to get state include: canDrop, isOver, didDrop

class ShoppingCart extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget, } = this.props;
    const isActive = canDrop && isOver;
    let backgroundColor = '#FFFFFF';
    if (isActive) {
      backgroundColor = '#f7f7bd';
    }
    else if(canDrop) {
      backgroundColor = '#f7f7f7';
    }
    const style = {
      backgroundColor: backgroundColor,
    };

    return connectDropTarget(
      <div className="shopping-cart" style={style}>
        {isActive ? 'Humm,snack!' : 'Drag here to order'}
    </div> );
  }
}

ShoppingCart.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);
//https://github.com/pro-react/kanban-app/tree/chapter1