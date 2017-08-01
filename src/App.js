import React from 'react'
import { Route } from "react-router-dom";
import Shelf from "./components/shelf";
import Search from "./components/search";
import * as BooksAPI from './BooksAPI'
import './App.css'

const SHELF_CURRENTLY_READING = "currentlyReading";
const SHELF_WANT_TO_READ = "wantToRead";
const SHELF_READ = "read";
const SHELF_NONE = "none";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    }
    this.onMoveBook = this.onMoveBook.bind(this);
  }

  componentDidMount() {
    //Load the inital data set
    BooksAPI.getAll().then(books => {
      console.log("books loaded: " + books)
      this.setState({ books })
    })
  }

  /**
   * Allows to mave a book from one shelf to another shelf
   */
  onMoveBook(selectedBook, targetShelf) {

    //If the shelf of the selectedBook is "none" it is new and we have to add it to the state
    if (selectedBook.shelf === SHELF_NONE) {
      console.log("add new book")
      //Set the targetShelf of the book
      selectedBook.shelf = targetShelf;

      BooksAPI.update(selectedBook, targetShelf)

      this.setState(state => ({
        books: state.books.concat([selectedBook])
      }))
    }
    // If the book already has a shelf and the targetShelf is not "none". We move it to the target shelf.
    else {
      console.log("move book to shelf " + targetShelf)

      BooksAPI.update(selectedBook, targetShelf)

      //If the book is moved to the shelf "none" we have to remove it from the state
      if (targetShelf === SHELF_NONE) {
        this.setState(oldState => ({
          books: oldState.books.filter(book => book.id !== selectedBook.id)
        }))
      }
      //Otherwise we update the shelf of the book in the state
      else {
        this.setState(oldState => ({
          books: oldState.books.map(book => {
            if (book.id === selectedBook.id) {
              book.shelf = targetShelf
            }
            return book
          })
        }))
      }
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <Shelf
                books={this.state.books.filter(book => book.shelf === SHELF_CURRENTLY_READING)}
                shelfTitle="Currently Reading"
                onMoveBook={this.onMoveBook}
              />
              <Shelf
                books={this.state.books.filter(book => book.shelf === SHELF_WANT_TO_READ)}
                shelfTitle="Want to Read"
                onMoveBook={this.onMoveBook}
              />
              <Shelf
                books={this.state.books.filter(book => book.shelf === SHELF_READ)}
                shelfTitle="Read"
                onMoveBook={this.onMoveBook}
              />
            </div>
            <div className="open-search">
              <a onClick={() => history.push("/search")}>Add a book</a>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <Search
            onMoveBook={this.onMoveBook}
            booksOnShelf={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
