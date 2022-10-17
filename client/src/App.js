import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBook from './components/SearchBook/SearchBook';
import SavedBooks from "./components/SavedBook/SavedBooks";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SearchBook/>} />
          <Route path="/books" element={<SearchBook/>} />
          <Route path="/savedbooks" element={<SavedBooks/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
