import React from 'react';
import { useLocation } from "react-router-dom";

const Menu = () => {
  let type = 'search';
  let location = useLocation();
  const handleClick = () => {
    type=location.pathname==="/savedbooks" ? 'saved' : type;
  }
  return (
    <div onClick={handleClick()} className="ui top fixed inverted massive menu">
      <a className={`item ${type==='search' ? 'active' : ''}`} href="/">Search Books</a>
      <a className={`item ${type==='saved' ? 'active' : ''}`} href="/savedbooks">Saved Books</a>
    </div>
  );
}

export default Menu;