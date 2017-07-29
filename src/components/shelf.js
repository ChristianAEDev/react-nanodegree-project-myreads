import React, { Component } from "react";
import Book from "./book";

class Shelf extends Component {
    render() {
        const { books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/*Iterate of the books array passed by the paraent component to display each individual book.  */}
                        {books.map(book => (<Book key={book.id} book={book} />))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf;