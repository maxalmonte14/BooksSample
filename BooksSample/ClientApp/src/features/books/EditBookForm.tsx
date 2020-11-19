import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Book } from '../../types';
import BookForm from './BookForm';
import { updateBook } from './bookSlice';
import { AppDispatch } from '../../reducers';
import { unwrapResult } from '@reduxjs/toolkit';
import { Redirect } from 'react-router';

interface Props {
  location: { state: Book }
}

export default function EditBookForm(props: Props) {
  const book: Book = props.location.state;
  const dispatch = useDispatch<AppDispatch>();
  const [redirect, updateRedirect] = useState(false);

  const onSubmitHandler = async (data: Book) => {
    if (modelStateIsValid(data)) {
      try {
        const resultAction = await dispatch(updateBook({ ...data, id: book.id }));
        const unwrapedResult = unwrapResult(resultAction);

        if ('errors' in unwrapedResult) {
          if (unwrapedResult.status === 400) {
            alert('The data you submitted is not valid, please try again.');
          } else if (unwrapedResult.status === 404) {
            alert(`The book you're trying to update doest not exist.`);
          } else if (unwrapedResult.status === 500) {
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

  const modelStateIsValid = (data: Book) => {
    return [data.title, data.authorId, data.year, data.pagesCount].every(e => e != null);
  }

  if (redirect) {
    return <Redirect push to="/" />;
  }

  return (
    <BookForm initialState={book} onSubmit={(data: Book) => onSubmitHandler(data)}>
      <div>
        <button style={{ marginTop: "5px" }} className="btn btn-success" type="submit">Submit</button>
      </div>
    </BookForm>
  );
}