import React, { Component } from "react";
import shortid from "shortid";
import Book from "./book";

class Shelf extends Component {
    render() {
        const { books, shelfTitle, onMoveBook } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/*Iterate of the books array passed by the paraent component to display each individual book.  */}
                        {books.map(book => (
                            <Book
                                key={shortid.generate()}
                                book={book}
                                onMoveBook={onMoveBook}
                            />))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf;