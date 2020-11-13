import React from 'react';
import { Link } from 'react-router-dom';
import HttpClient from '../services/HttpClient';

export default class BookCard extends React.Component {
  constructor(props) {
    super(props);

    this.deleteBookClickHandler = this.deleteBookClickHandler.bind(this);
  }

  deleteBookClickHandler(id) {
    HttpClient.deleteBook(id)
    .then(response => {
      if(response.status == 204) {
        this.props.onDelete(id);
      } else if(response.status == 404) {
        this.props.onDeleteFailure("The book you're trying to delete doest not exist.");
      } else if(response.status == 500) {
        this.props.onDeleteFailure("Sorry, there was a failure in the server, please try again.");
      }
    })
    .catch(data => console.log(data));
}

render() {
  return (
    <div className="card" style={{marginTop: "5px", marginBottom: "5px"}}>
      <div className="card-body">
        <h5 className="card-title">{this.props.book.title}</h5>
        <p className="card-text"></p>

        <Link className="btn btn-primary"
          style={{marginRight: "2px", marginLeft: "2px"}}
          to={{
            pathname: `/books/${this.props.book.id}`,
            state: this.props.book
          }}>View</Link>

        <Link className="btn btn-primary"
          style={{marginRight: "2px", marginLeft: "2px"}}
          to={{
            pathname: `/books/${this.props.book.id}/edit`,
            state: this.props.book
          }}>Edit</Link>

        <button className="btn btn-danger" onClick={() => this.deleteBookClickHandler(this.props.book.id)}>Delete</button>
      </div>
    </div>
    );
  }
}