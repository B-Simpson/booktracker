import { Link } from "react-router-dom";
import { getAll, update, get } from "../BooksAPI";
import Bookshelf from "../components/Bookshelf";
import { useEffect, useState } from "react";


const BookShelves = () => {

    const [userBooks, setUserBooks] = useState([]);

    useEffect(() => {
      const fetchBooks = async () => {
        const books = await getAll();
        setUserBooks(books);
      };
      fetchBooks();
    })
    
    const handleShelfUpdate = (book, shelf) => {
        update(book, shelf);
    }

    const handleDrag = (e, bookId) => {
      e.dataTransfer.setData("text/plain", bookId);
    }

    const handleDrop = (e) => {
      e.preventDefault();
      const bookId = e.dataTransfer.getData("text/plain");
      const fetchBooks = async () => {
        let getSelectedBook = await get(bookId); 
        const updateBooks = async () => {
          await update(getSelectedBook, e.target.id);
        }
        updateBooks()
      }
      fetchBooks();      

    }
        

    return (
        <div>
          <div className="list-books-content">
            <div>
              <Bookshelf 
                shelfname="Currently Reading"
                bookshelfId="currentlyReading"
                userBooks={userBooks.filter((book)=> book.shelf === "currentlyReading")}
                handleShelfUpdate={handleShelfUpdate}
                handleDrop={handleDrop}
                handleDrag={handleDrag}
              />  
              <Bookshelf 
                shelfname="Want to Read"
                bookshelfId="wantToRead"
                userBooks={userBooks.filter((book)=> book.shelf === "wantToRead")}
                handleShelfUpdate={handleShelfUpdate}
                handleDrop={handleDrop}
                handleDrag={handleDrag}
              />
              <Bookshelf 
                shelfname="Read"
                bookshelfId="read"
                userBooks={userBooks.filter((book)=> book.shelf === "read")}
                handleShelfUpdate={handleShelfUpdate}
                handleDrop={handleDrop}
                handleDrag={handleDrag}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>

    )
}

export default BookShelves;