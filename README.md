# React-Book-Search Using React Hooks

**APP Link** https://book-search-react-hooks.herokuapp.com

* A full stack application built with react/hooks, express, mongodb & node.js.
* User searches for books via the Google Books API and the search results are rendered here.
* User has the option to navigate to the book directly to make a purchase.
* User has the option to save/delete book.

If you choose to run this repo locally instead of the cloud hosted link provided above, you will need to clone this repo and add a `/.env` file at the root of the folder with follwing key values:
```
USER_NAME=username for you mongodb atlast account (I set up mongodb using https://cloud.mongodb.com)
PASSWORD=password for db cluster for username above
BASEURL1="https://www.googleapis.com/books/v1/volumes?q=:"
APIKEY1="&key=`Replace this with you google books api key`&startIndex=0&maxResults=40"
```
* After having .env file setup in the terminal, run `npm install` and then `npm run start`

React hooks tutorial source: Udemy<br/>
Paginate tutorial source: https://www.youtube.com/watch?v=IYCa1F-OWmk