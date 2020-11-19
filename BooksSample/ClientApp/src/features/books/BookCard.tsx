import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';
import { useDispatch } from 'react-redux';
import { deleteBook } from './bookSlice';
import { AppDispatch } from '../../reducers';
import { unwrapResult } from '@reduxjs/toolkit';

interface Props {
  book: Book
}

export default function BookCard(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const deleteBookClickHandler = async (id: string) => {
    try {
      const resultAction = await dispatch(deleteBook(id));
      const unwrapedResult = unwrapResult(resultAction);

      if (unwrapedResult.status === 404) {
        alert(`The book you're trying to delete doesn't not exist.`);
      } else if (unwrapedResult.status === 500) {
        alert('Sorry, there was a failure in the server, please try again.');
      }
    } catch (error) {
      alert('Oopps, there was an error while trying to comunicate with the server, please try again.');
    }
  }

  return (
    <div className="card" style={{ marginTop: "5px", marginBottom: "5px" }}>
      <div className="card-body">
        <h5 className="card-title">{props.book.title}</h5>
        <p className="card-text"></p>

        <Link className="btn btn-primary"
          style={{ marginRight: "2px", marginLeft: "2px" }}
          to={{
            pathname: `/books/${props.book.id}`,
            state: props.book
          }}>View</Link>

        <Link className="btn btn-primary"
          style={{ marginRight: "2px", marginLeft: "2px" }}
          to={{
            pathname: `/books/${props.book.id}/edit`,
            state: props.book
          }}>Edit</Link>

        <button
          className="btn btn-danger"
          onClick={() => deleteBookClickHandler(props.book.id)}>
          Delete
      </button>
      </div>
    </div>
  );
}