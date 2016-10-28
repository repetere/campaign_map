import React, { Component, PropTypes, } from 'react';
import { DragSource } from 'react-dnd';
import constants from './constants';

//Snack DND Spec
//required: beginDrag
//optional: endDrag
//optional: canDrag
//optional: isDragging
const SnackSpec = {
  beginDrag(props) {
    return { name: props.name, };
  },
  endDrag(props, monitor) {
    const dragItem = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
    }
  },
};

//Snack dragsource - collect collecting function
//connect: an instance of DropTargetConncetor, it can be uysed to assign the dorp target role to a DOM now
//monitor: an instance of DropTargetMonitor - you use it to connect state from the react dnd to props, availble functions to get state include: canDrag, isDragging, getItemType,getItem,didDrop
let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

class Snack extends Component {
  render() {
    const { name, isDragging, connectDragSource, } = this.props;
    const opacity = isDragging? 0.4 : 1;
    const style = {
      opacity: opacity,
    };

    return connectDragSource(
      <div className="snack" style={style}>
        {name}
    </div> );
  }
}

Snack.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default DragSource(constants.SNACK, SnackSpec, collect)(Snack);
//https://github.com/pro-react/kanban-app/tree/chapter1