import React, { Component } from "react";
import { SHELF_CURRENTLY_READING, SHELF_WANT_TO_READ, SHELF_READ, SHELF_NONE } from "../App";

class Book extends Component {
    render() {
        const { book } = this.props;
        
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={book.shelf} onChange={(e) => this.props.onMoveBook(book, e.target.value, false)}>
                                <option disabled>Move to...</option>
                                <option className={book.shelf === SHELF_CURRENTLY_READING ? 'highlight-shelf' : null} value={SHELF_CURRENTLY_READING}>Currently Reading</option>
                                <option className={book.shelf === SHELF_WANT_TO_READ ? 'highlight-shelf' : null} value={SHELF_WANT_TO_READ}>Want to Read</option>
                                <option className={book.shelf === SHELF_READ ? 'highlight-shelf' : null} value={SHELF_READ}>Read</option>
                                <option className={book.shelf === SHELF_NONE ? 'highlight-shelf' : null} value={SHELF_NONE}>None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.author}</div>
                </div>
            </li>
        )
    }
}

export default Book;