import { useEffect, useRef } from "react"

import {  get } from "../BooksAPI"
import { useNavigate } from "react-router-dom";

const Book = ({ book, handleShelfUpdate, handleDrag }) => {

    const bookOption = useRef();

    const handleChange = (e) => {
        handleShelfUpdate(book, e.target.value)
    }
    
    useEffect(() => {
        const fetchBooks = async () => {
            const searchResult = await get(book.id);
            if(bookOption.current) bookOption.current.value = searchResult.shelf;
        }
        fetchBooks();

    },[book.id])

    let navigate = useNavigate();

    const handleClick = () => {
        navigate(`/book/${book.id}`);
    }

    return (
        <li id={book.id} draggable="true" onDragStart={(e) =>handleDrag(e, book.id)}>
            <div className="book">
                <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                        `url(${book.imageLinks.smallThumbnail})`,
                    }}
                    onClick={handleClick}
                ></div>
                <div className="book-shelf-changer">
                    <select ref={bookOption} onChange={handleChange}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(", ") }</div>
            </div>
        </li>
    )
}

export default Book