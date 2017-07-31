import React from 'react'
import { Route } from "react-router-dom";
import Shelf from "./components/shelf";
import Search from "./components/search";
import * as BooksAPI from './BooksAPI'
import './App.css'

const SHELF_CURRENTLY_READING = "Currently Reading";
const SHELF_WANT_TO_READ = "Want to Read";
const SHELF_READ = "Read";
const SHELF_NONE = "None";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [
        { "title": "iOS Programming", "subtitle": "The Big Nerd Ranch Guide", "authors": ["Christian Keur", "Aaron Hillegass"], "publisher": "Pearson Technology Group", "publishedDate": "2016-12-05", "description": "Updated for Xcode 8, Swift 3, and iOS 10, iOS Programming: The Big Nerd Ranch Guide leads you through the essential concepts, tools, and techniques for developing iOS applications. After completing this book, you will have the know-how and the confidence you need to tackle iOS projects of your own. Based on Big Nerd Ranch's popular iOS training and its well-tested materials and methodology, this bestselling guide teaches iOS concepts and coding in tandem. The result is instruction that is relevant and useful. Throughout the book, the authors explain what's important and share their insights into the larger context of the iOS platform. You get a real understanding of how iOS development works, the many features that are available, and when and where to apply what you've learned.", "industryIdentifiers": [{ "type": "ISBN_13", "identifier": "9780134682365" }, { "type": "ISBN_10", "identifier": "013468236X" }], "readingModes": { "text": true, "image": true }, "pageCount": 416, "printType": "BOOK", "categories": ["Computers"], "maturityRating": "NOT_MATURE", "allowAnonLogging": true, "contentVersion": "1.3.2.0.preview.3", "panelizationSummary": { "containsEpubBubbles": false, "containsImageBubbles": false }, "imageLinks": { "smallThumbnail": "http://books.google.com/books/content?id=XRekDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api", "thumbnail": "http://books.google.com/books/content?id=XRekDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" }, "language": "en", "previewLink": "http://books.google.com/books?id=XRekDQAAQBAJ&printsec=frontcover&dq=ios&hl=&cd=1&source=gbs_api", "infoLink": "https://play.google.com/store/books/details?id=XRekDQAAQBAJ&source=gbs_api", "canonicalVolumeLink": "https://market.android.com/details?id=book-XRekDQAAQBAJ", "id": "XRekDQAAQBAJ", "shelf": SHELF_CURRENTLY_READING }
      ]
    }
    this.onMoveBook = this.onMoveBook.bind(this);
  }

  /**
   * Allows to mave a book from one shelf to another shelf
   */
  onMoveBook(selectedBook, targetShelf) {

    // Find the index of the selected book
    let indexSelectedBook = this.state.books.findIndex(v => v.id === selectedBook.id);

    //If the current shelf is "none" it is a new book from the search
    if (selectedBook.shelf === "none") {
      console.log("add book")
      selectedBook.shelf = targetShelf
      this.setState(state => ({
        books: state.books.concat([selectedBook])
      }))
    }
    //If the new state is "none" we just want to remove it from the books array
    else if (targetShelf === SHELF_NONE) {
      console.log("remove book")
      console.log("selectedBook.id: " + selectedBook.id)
      this.setState(state => ({
        books: state.books.filter(book => {
          console.log("book.id: " + book.id)
          console.log("return: " + book.id === selectedBook.id)
          return book.id === selectedBook.id
        })
      }))
      console.log("after remove: " + JSON.stringify(this.state.books))
    }
    // Otherwise we move the book to the target shelf
    else {
      console.log("move book")
      // Update the book in the shelf
      this.state.books[indexSelectedBook].shelf = targetShelf;

      this.setState(state => ({
        // Replace the current book with our updated book
        books: state.books
      })
      )
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
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
