import React, { useState } from 'react';
import { Redirect } from 'react-router';
import HttpClient from '../services/HttpClient';
import { Book } from '../types';
import BookForm from './BookForm';

export default function CreateBookForm() {
  const [redirect, updateRedirect] = useState(false);
  const initialState = {} as Partial<Book>;

  const onSubmitHandler = (data: Book) => {
    if (modelStateIsValid(data)) {
      HttpClient.createBook({
        name: data.title,
        authorId: data.authorId,
        year: data.year,
        pagesCount: data.pagesCount,
      })
      .then(response => {
        if(response.status === 201) {
          updateRedirect(true);
        } else if(response.status === 400) {
          alert("The data you submitted is not valid, please try again.");
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
    <BookForm initialState={initialState} onSubmit={(data: Book) => onSubmitHandler(data)}>
      <div>
        <button style={{marginTop: "5px"}} className="btn btn-success" type="submit">Submit</button>
      </div>
    </BookForm>
    );
  }