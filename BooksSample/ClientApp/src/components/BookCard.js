import React from 'react';
import { Link } from 'react-router-dom';
import HttpClient from '../services/HttpClient';

export default function BookCard(props) {
  function deleteBookClickHandler(id) {
    HttpClient.deleteBook(id)
    .then(response => {
      if(response.status == 204) {
        props.onDelete(id);
      } else if(response.status == 404) {
        props.onDeleteFailure("The book you're trying to delete doest not exist.");
      } else if(response.status == 500) {
        props.onDeleteFailure("Sorry, there was a failure in the server, please try again.");
      }
    });
}

return (
  <div className="card" style={{marginTop: "5px", marginBottom: "5px"}}>
    <div className="card-body">
      <h5 className="card-title">{props.book.title}</h5>
      <p className="card-text"></p>

      <Link className="btn btn-primary"
        style={{marginRight: "2px", marginLeft: "2px"}}
        to={{
          pathname: `/books/${props.book.id}`,
          state: props.book
        }}>View</Link>

      <Link className="btn btn-primary"
        style={{marginRight: "2px", marginLeft: "2px"}}
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