import "./App.css";
import { useState } from "react";

import Search from "./pages/search";
import BookShelves from "./pages/BookShelves";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="app">
        
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BookShelves />} />
            <Route path="/search" element={<Search />} />
            <Route path="/book/:id" element={<BookPage />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
