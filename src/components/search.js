import _ from "lodash";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Shelf from "./shelf";
import * as BooksAPI from "../BooksAPI";

class Search extends Component {

    constructor() {
        super();
        this.state = {
            searchQuery: "",
            searchResult: []
        }
        this.onMoveBookInSearch = this.onMoveBookInSearch.bind(this);
    }

    onSearch(searchTerm) {
        this.setState({ searchQuery: searchTerm })
        //Only search if we have something to search for
        if (searchTerm.length > 1) {

            BooksAPI.search(this.state.searchQuery, 20)
                .then(result => {
                    // Check that there is data in the result
                    if (result && result.length > 0) {
                        let booksAlreadyStored = _.keyBy(this.props.booksOnShelf, "id");
                        this.setState(state => ({
                            searchResult: result.filter(book => {
                                if (typeof booksAlreadyStored[book.id] !== 'undefined') {
                                    book.shelf = booksAlreadyStored[book.id].shelf
                                }
                                return book
                            })
                        }))
                    }
                })
        }
    }

    /**
     * This method is used when a book in the search is moved to a shelf.
     */
    onMoveBookInSearch(selectedBook, targetShelf) {

        this.setState(currentState => ({
            searchResult: currentState.searchResult.map(book => {
                if (book.id === selectedBook.id) {
                    book.shelf = targetShelf
                }
                return book
            })
        }))

        this.props.onMoveBook(selectedBook, targetShelf)
    }

    render() {
        const { searchQuery } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            value={searchQuery}
                            type="text"
                            placeholder="Search by title or author"
                            onChange={event => this.onSearch(event.target.value)}
                            autoFocus={true}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <Shelf
                        books={this.state.searchResult}
                        shelfTitle="Search Result"
                        onMoveBook={this.onMoveBookInSearch}
                    />
                </div>
            </div>
        );
    }
}

export default Search;