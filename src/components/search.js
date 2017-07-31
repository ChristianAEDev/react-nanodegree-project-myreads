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
    }

    onSearch(searchTerm) {
        this.setState({ searchQuery: searchTerm })

        BooksAPI.search(this.state.searchQuery, 20)
            .then(result => {
                this.setState({ searchResult: result })
            })

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
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <Shelf
                        books={this.state.searchResult}
                        shelfTitle="Search Result"
                        onMoveBook={this.props.onMoveBook}
                    />
                </div>
            </div>
        );
    }
}

export default Search;