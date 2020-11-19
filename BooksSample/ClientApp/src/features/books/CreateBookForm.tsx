import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { createBook } from './bookSlice';
import { AppDispatch } from '../../reducers';
import { Book } from '../../types';
import BookForm from './BookForm';

export default function CreateBookForm() {
  const [redirect, updateRedirect] = useState(false);
  const initialState = {} as Partial<Book>;
  const dispatch = useDispatch<AppDispatch>();

  const onSubmitHandler = async (data: Book) => {
    if (modelStateIsValid(data)) {
      try {
        const resultAction = await dispatch(createBook(data));
        const unwrapedResult = unwrapResult(resultAction);

        if ('errors' in unwrapedResult) {
          if (unwrapedResult.status === 500) {
            alert('Sorry, there was a failure in the server, please try again.');
          }
        } else {
          updateRedirect(true);
        }
      } catch (error) {
        alert('Oopps, there was an error while trying to comunicate with the server, please try again.');
      }
    }
  }

  const modelStateIsValid = (data: Book): boolean => {
    return true;
    // return [data.title, data.authorId, data.year, data.pagesCount].every(e => e != null);
  }

  if (redirect) {
    return <Redirect push to="/" />;
  }

  return (
    <BookForm initialState={initialState} onSubmit={(data: Book) => onSubmitHandler(data)}>
      <div>
        <button style={{ marginTop: "5px" }} className="btn btn-success" type="submit">Submit</button>
      </div>
    </BookForm>
  );
}