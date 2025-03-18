import Book from "./Book";

export default function Bookshelf({ shelfname,bookshelfId, userBooks, handleShelfUpdate, handleDrag, handleDrop }) {
    const allowDrop = (e) => {
      e.preventDefault();
    }
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfname}</h2>
            <div className="bookshelf-books">
              <ol id={bookshelfId} className="books-grid" onDrop={handleDrop} onDragOver={allowDrop}>
                {userBooks.map((book, index) => (
                  <Book 
                    key={index}
                    book={book}
                    handleShelfUpdate={handleShelfUpdate}
                    handleDrag={handleDrag}
                  />
                ))}

              </ol>
            </div>
        </div>
    )
}