import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <Outlet />
        </div>
    )
}