import React from 'react';
import { useLocation, Link } from "react-router-dom";

const Menu = () => {
  let type = 'search';
  let location = useLocation();
  const handleClick = () => {
    type=location.pathname==="/savedbooks" ? 'saved' : type;
  }
  return (
    <div onClick={handleClick()} className="ui top fixed inverted massive menu">
      <Link className={`item ${type==='search' ? 'active' : ''}`} to="/">Search Books</Link>
      <Link className={`item ${type==='saved' ? 'active' : ''}`} to="/savedbooks">Saved Books</Link>
    </div>
  );
}

export default Menu;