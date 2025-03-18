import { useParams, useNavigate } from "react-router-dom"
import { get } from "../BooksAPI"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Bookpage.css"

export default function BookPage() {
    const { id } = useParams();
    const [bookData, setBookData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const searchResult = await get(id);
                if (!searchResult) {
                    throw new Error("Book not found");
                }
                setBookData(searchResult);
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };
        fetchBooks();
    }, [id]);
    

    return (
        <div className="m-10 grid grid-cols-12 gap-5">
            {bookData ? (
            <>
                <div className="col-span-3">
                    <img className="w-100" src={bookData.imageLinks?.thumbnail} alt="Book Thumbnail" />
                </div>
                <div className="col-span-9">
                    <h1>{bookData.title}</h1>
                    <h2>{bookData.subtitle}</h2>
                    <h3>{bookData.authors?.join(", ")}</h3>
                    <h4>{bookData.categories?.join("/ ")}</h4>
                    <h4>{bookData.publishedDate}</h4>
                    <div className="mt-4">
                        <p>{bookData.description}</p>
                    </div>
                        <button onClick={()=>navigate(-1)} className="mt-8">Back</button>
                </div>
            </>
        ) : (
            <p>Loading book data...</p>
        )}
        </div>
    )
}

