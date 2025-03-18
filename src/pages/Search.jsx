import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import { search, update, get } from '../BooksAPI'

export default function Search() {

    const [searchedBooks, setSearchedBooks] = useState([]);

    const handleChange = (e) => {
        if(e.target.value.length > 3){
            const fetchBooks = async () => {
                const searchResult = await search(e.target.value, 20);
                setSearchedBooks(searchResult);  
            }
            fetchBooks();

        }else{
            setSearchedBooks([])
        }
    }

    const handleShelfUpdate = (book, shelf) => {
        update(book, shelf);
    }

    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/"
              className="close-search"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {searchedBooks.length > 0  ? (
                    searchedBooks.map((book, index) => (
                    <Book 
                        key={index} 
                        book={book} 
                        handleShelfUpdate={handleShelfUpdate}
                    />
                ))
                ) : (
                    <div>No results found. Please refine your search</div>
                )}
            </ol>
          </div>
        </div>
    )
}