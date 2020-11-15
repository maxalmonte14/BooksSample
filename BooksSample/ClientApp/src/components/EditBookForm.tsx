import React, { useState } from 'react';
import { Redirect } from 'react-router';
import HttpClient from '../services/HttpClient';
import { Book } from '../types';
import BookForm from './BookForm';

interface Props {
  location: { state: Book }
}

export default function EditBookForm(props: Props) {
  const [redirect, updateRedirect] = useState(false);
  const book: Book = props.location.state;

  const onSubmitHandler = (data: Book) => {
    if (modelStateIsValid(data)) {
      HttpClient.updateBook(book.id, {
        name: data.title,
        authorId: data.authorId,
        year: data.year,
        pagesCount: data.pagesCount,
      })
      .then(response => {
        if(response.status === 200) {
          updateRedirect(true);
        } else if(response.status === 400) {
          alert("The data you submitted is not valid, please try again.");
        } else if(response.status === 404) {
          alert("The book you're trying to update doest not exist.");
        } else if(response.status === 500) {
          alert("Sorry, there was a failure in the server, please try again.");
        }
      });
    }
  }

  const modelStateIsValid = (data: Book) => {
    return [data.title, data.authorId, data.year, data.pagesCount].every(e => e != null);
  }

  if (redirect) {
    return <Redirect push to="/" />;
  }

  return (
    <BookForm initialState={book}  onSubmit={(data: Book) => onSubmitHandler(data)}>
      <div>
        <button style={{marginTop: "5px"}} className="btn btn-success" type="submit">Submit</button>
      </div>
    </BookForm>
  );
}