import React from 'react';
import ReactDOM, {render} from 'react-dom';

//https://github.com/pro-react/kanban-app/tree/chapter1
class Search extends React.Component{
    constructor() {
        super();
        this.state = {
            searchTerm: "React"
        }
    }   
    handleChange(event) {
        this.setState({ searchTerm: event.target.value });
    }
    handleSubmit(event) {
        console.log('submitted values are: ', event.target.name.value, event.target.email.value);
        event.preventDefault();
    }
    render() {
        return (<form onSubmit={this.handleSubmit.bind(this)}>
    <div className="formGroup">
      Name: <input name="name" type="text" />
    </div>
    <div className="formGroup">
      E-mail: <input name="email" type="mail" />
    </div>
    <button type="submit">Submit</button>
  </form>)
        // return (
        // <div>
        //         Search Term: <input type="search" value={this.state.searchTerm}
        //             onChange={this.handleChange.bind(this)}
        //             />
        // </div>)
    }
}

render(<Search />, document.body);