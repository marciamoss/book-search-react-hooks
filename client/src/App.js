import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookSearch from './components/BookSearch';
import SavedBooks from "./components/SavedBooks";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BookSearch/>} />
          <Route path="/books" element={<BookSearch/>} />
          <Route path="/savedbooks" element={<SavedBooks/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
