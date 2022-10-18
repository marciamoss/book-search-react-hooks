const createBookObject = (book) => {
  let id="", title="", authors="", booklink="", bookimg="", synopsis="";
  if(book.id){
    id=book.id;
  }
  if(book.volumeInfo.title){
    title=book.volumeInfo.title;
  }
  if(book.volumeInfo.authors){
    authors=" by " + (book.volumeInfo.authors).join(", ");
  }
  if(book.volumeInfo.infoLink){
    booklink=book.volumeInfo.infoLink;
  }
  if("imageLinks" in book.volumeInfo){
    if("smallThumbnail" in book.volumeInfo.imageLinks){
      bookimg= book.volumeInfo.imageLinks.smallThumbnail;
    }
  }
  if(book.volumeInfo.description){
    synopsis=book.volumeInfo.description;
  }
  return {
    id,
    title,
    authors,
    booklink,
    bookimg,
    synopsis
  };

}

export default createBookObject;
