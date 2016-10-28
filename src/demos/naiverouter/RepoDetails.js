import React, { Component, } from 'react';
import 'whatwg-fetch';

class RepoDetails extends Component {
  // constructor() {
  //   super(...arguments);
  //   this.state = {
  //     repository: {},
  //   };
  // }
  // fetchData(repo_name){
  //   fetch(`https://api.github.com/repos/pro-react/${repo_name}`)
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       this.setState({ repository:responseData, });
  //     });
  // }
  // componentDidMount() {
  //   //the router injects the key 'repo_name' inside the params props
  //   let repo_name = this.props.params.repo_name;
  //   this.fetchData(repo_name);
  // }
  renderRepository() {
    let repository = this.props.repositories.find((repo) => repo.name === this.props.params.repo_name);
    let stars = [];
    for (var i = 0; i < repository.stargazers_count; i++){
      stars.push('⭐️');
    }
    return ( 
      <div>
        <h2>{repository.name}</h2>
        <p>{repository.description}</p>
        <span>{stars}</span>
        </div>
      );
  }
  render() {
    if (this.props.respositories.length > 0) {
      return this.renderRepository();
    } else {
      return <h4>Loading...</h4>;
    }
  }
}
export default RepoDetails;
//https://github.com/pro-react/kanban-app/tree/chapter1