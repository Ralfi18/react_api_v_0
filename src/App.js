import React, { Component } from 'react';
import Books from './components/Books';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

class App extends Component {
  state = {
    user: null,

  }

  getUserData = (table) => {
    const localStorageBooks = localStorage.getItem(table);
    if (localStorage){
      return JSON.parse(localStorageBooks);
    } 
    return false;
  };

  logout = () => {
    if (this.getUserData('user')) {
      this.setState({user: false});
      localStorage.removeItem('user');
      return <Redirect to="/" />
    }
  }

  render() {

    return (
      <Router>
        <div>
        <button onClick={this.logout}>Logout</button>
          <nav>
            <ul>
              <li>
                <Link to="/">home</Link>
                <Link to="/login">Login</Link>
                <Link to="/books">Books</Link>
              </li>
            </ul>
          </nav>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" exact component={Books} />
          <PrivateRoute exact path="/books" exact component={Books} />
        </div>
      </Router>
    );
  }
}

export default App;
