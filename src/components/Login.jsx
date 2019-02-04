import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      userName: '',
      password: '',
      token: null,
      isAuthenticated: false,
      redirect: false,
    };
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
    if (this.getUserData('user')) {
      this.props.history.push('/');
    }
  }

  setUserData = (table, json) => {
    if (localStorage){
      localStorage.setItem(table,  JSON.stringify(json));
      this.setState({redirect: true});
      return true;
    } else {
      return false;
      console.log('np localStorage');
    }
  };

  getUserData = (table) => {
    const localStorageBooks = localStorage.getItem(table);
    if (localStorage){
      return JSON.parse(localStorageBooks);
    } else {
      console.log('np localStorage');
    }
  };
  
  handleSubmit = (event) => {
    event.preventDefault();

    const _this = this;
    const url = 'http://api-ci.loc/login';
    const options = {
      method: "post", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        username: _this.state.userName,
        password: _this.state.password
      })
    };

    fetch(url, options)
    .then(response => {
      return response.json();
    })
    .then(json => {
      if (this.setUserData('user', json)) {
        console.log("test", this.props);
        // this.context.router.history.push('/books');
        // this.props.history.push("/books", {user: json});
      }
    })
    .catch( error => {
      console.warn('Request failure: ', error);
    });
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render () {

    return(
      <Fragment>
        <form action="" onSubmit={this.handleSubmit}>
          <input type="text" name="userName" onChange={this.handleChange} value={this.state.userName}/>
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
          <input type="submit" />
        </form>
      </Fragment>
    )
  }
}

export default withRouter(Login);
