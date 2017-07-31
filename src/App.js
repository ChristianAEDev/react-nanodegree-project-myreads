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
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  /**
   * Allows to mave a book from one shelf to another shelf
   */
  onMoveBook(selectedBook, targetShelf) {
    console.log("onMoveBook: Selected book: " + selectedBook.id + " - " + selectedBook.title + " / Target shelf: " + targetShelf);

    //If the shelf of the selectedBook is "none" it is new and we have to add it to the state
    if (selectedBook.shelf === SHELF_NONE) {
      console.log("Add new book")

      //Set the targetShelf of the book
      selectedBook.shelf = targetShelf;

      BooksAPI.update(selectedBook, targetShelf).then(returnValue => (console.log(returnValue)))

      this.setState(state => ({
        books: state.books.concat([selectedBook])
      }))
    }
    // If the book already has a shelf and the targetShelf is not "none". We move it to the target shelf.
    else {
      this.setState(oldState => {
        BooksAPI.update(selectedBook, targetShelf).then(returnValue => (console.log(returnValue)))

        books: oldState.books.map(book => {
          if (book.id === selectedBook.id) {
            book.shelf = targetShelf
          }
        })
      })
    }


    // // Find the index of the selected book
    // let indexSelectedBook = this.state.books.findIndex(v => v.id === selectedBook.id);

    // //If the current shelf is "none" it is a new book from the search
    // if (selectedBook.shelf === "none") {
    //   console.log("add book")
    //   selectedBook.shelf = targetShelf
    //   this.setState(state => ({
    //     books: state.books.concat([selectedBook])
    //   }))
    // }
    // //If the new state is "none" we just want to remove it from the books array
    // else if (targetShelf === SHELF_NONE) {
    //   console.log("remove book")
    //   console.log("selectedBook.id: " + selectedBook.id)
    //   this.setState(state => ({
    //     books: state.books.filter(book => {
    //       console.log("book.id: " + book.id)
    //       console.log("return: " + book.id === selectedBook.id)
    //       return book.id === selectedBook.id
    //     })
    //   }))
    //   console.log("after remove: " + JSON.stringify(this.state.books))
    // }
    // // Otherwise we move the book to the target shelf
    // else {
    //   console.log("move book")
    //   // Update the book in the shelf
    //   this.state.books[indexSelectedBook].shelf = targetShelf;

    //   this.setState(state => ({
    //     // Replace the current book with our updated book
    //     books: state.books
    //   })
    //   )
    // }
  }

  render() {

    console.log("this.state.books: " + this.state.books)

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
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
