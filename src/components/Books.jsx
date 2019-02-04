import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Books extends Component {
  state = {
    books: [],
    title: '',
    author: '',
    price: '',
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    const _this = this;
    fetch('http://api-ci.loc/books', {
      method: 'post',
      mode: 'cors',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      if (localStorage){
        localStorage.setItem('books',  JSON.stringify(myJson))
      } else {
      }
      _this.setState({ books: myJson });
    });
  }

  handleChange = (event) => {
    const name = event.target.name;
    const id = event.target.value;
    this.setState({ id });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const jsonString = JSON.stringify({
      title: this.state.id
    });
    const _this = this;
    const url = 'http://api-ci.loc/books/insert-user';
    fetch(url, {
      method: "post", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        title: _this.state.title || "no id"
      })
    })
    .then(response => {
      return response;
    })
    .then(data => {
      if (data.status === 200) {
        this.loadBooks();
      }
      // console.log('json: ', data);
    })
    .catch( error => {
      console.log('Request failure: ', error);
    });
  };

  render() {
    const { books } = this.state;
    const localStorageBooks = localStorage.getItem("books");

    return (
      <div className="App">
        { books && books.length > 0 ?
          <ul>
            {books.map((book, index) => {
              return <li key={index}>Title: {book.title} | Author: {book.author} | Price: {book.price}</li>;
            })}
          </ul>
          :
          'No books'
        }
        <form action="" onSubmit={this.handleSubmit} >
          <input type="text" name='id' placeholder='title' value={this.state.title} onChange={this.handleChange} />
          <input type="text" name='id' placeholder='author' value={this.state.author} onChange={this.handleChange} />
          <input type="text" name='id' placeholder='price' value={this.state.price} onChange={this.handleChange} />
          <input type="submit" value='Submit'/>
        </form>
      </div>
    );
  }
}

export default Books;
