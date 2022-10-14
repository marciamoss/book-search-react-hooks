import React from 'react';

const Menu = ({type}) => {
  return (
    <div className="ui top fixed inverted massive menu">
    <a className={`item ${type==='search' ? 'active' : ''}`} href="/">Search Books</a>
    <a className={`item ${type==='saved' ? 'active' : ''}`} href="/savedbooks">Saved Books</a>
    </div>
  )
};

export default Menu;