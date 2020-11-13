import React from 'react';
import { Redirect } from 'react-router';
import HttpClient from '../services/HttpClient';

export class BookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authors: [],
      redirect: false,
      selectedAuthorId: this.props.initialState.selectedAuthorId,
      title: this.props.initialState.title,
      year: this.props.initialState.year,
      pagesCount: this.props.initialState.pagesCount
    };
    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
    this.onAuthorChangeHandler = this.onAuthorChangeHandler.bind(this);
    this.onYearChangeHandler = this.onYearChangeHandler.bind(this);
    this.onPagesCountChangeHandler = this.onPagesCountChangeHandler.bind(this);
  }

  onTitleChangeHandler(value) {
    this.setState({ title: value });
  }

  onAuthorChangeHandler(value) {
    this.setState({ selectedAuthorId: value });
  }

  onYearChangeHandler(value) {
    this.setState({ year: value });
  }

  onPagesCountChangeHandler(value) {
    this.setState({ pagesCount: value });
  }

  onFormSubmitHandler(event) {
    event.preventDefault();

    if (this.props.type == "update") {
      this.updateBook();
    } else if (this.props.type == "create") {
      this.createBook();
    }
  }

  createBook() {
    if (this.modelStateIsValid()) {
      HttpClient.createBook({
        name: this.state.title,
        authorId: this.state.selectedAuthorId,
        year: this.state.year,
        pagesCount: parseInt(this.state.pagesCount),
      })
      .then(response => {
        if(response.status == 201) {
          this.setState({ redirect: true });
        } else if(response.status == 400) {
          alert("The data you submitted is not valid, please try again.");
        } else if(response.status == 500) {
          alert("Sorry, there was a failure in the server, please try again.");
        }
      });
  }
  }

  updateBook() {
    if (this.modelStateIsValid()) {
      HttpClient.updateBook(this.props.initialState.bookId, {
        name: this.state.title,
        authorId: this.state.selectedAuthorId,
        year: this.state.year,
        pagesCount: parseInt(this.state.pagesCount),
      })
      .then(response => {
        if(response.status == 200) {
          this.setState({ redirect: true });
        } else if(response.status == 400) {
          alert("The data you submitted is not valid, please try again.");
        } else if(response.status == 404) {
          this.props.onDeleteFailure("The book you're trying to update doest not exist.");
        } else if(response.status == 500) {
          alert("Sorry, there was a failure in the server, please try again.");
        }
      });
    }
  }

modelStateIsValid() {
  return this.state.title != null
      && this.state.selectedAuthorId != null
      && this.state.year != null
      && this.state.pagesCount != null;
}

componentDidMount() {
  HttpClient.getAuthors()
  .then(json => this.setState({ authors: json }))
  .catch(() => alert("Sorry, there was a failure in the server while trying to load the authors, please try again."));
}

render() {
  if (this.state.redirect) {
    return <Redirect push to="/" />;
  }

  return (
    <form onSubmit={(event) => this.onFormSubmitHandler(event)}>
      <div>
        <label>Title</label>
        <input
          className="form-control"
          value={this.state.title}
          onChange={(event) => this.onTitleChangeHandler(event.target.value)}/>
      </div>
      <div>
        <label>Year</label>
        <input
          className="form-control"
          value={this.state.year}
          onChange={(event) => this.onYearChangeHandler(event.target.value)}/>
      </div>
      <div>
        <label>Pages count</label>
        <input
          className="form-control"
          value={this.state.pagesCount}
          type="number"
          onChange={(event) => this.onPagesCountChangeHandler(event.target.value)}/>
      </div>
      <div>
        <label>Author</label>
        <select
          className="form-control"
          value={this.state.selectedAuthorId}
          onChange={(event) => this.onAuthorChangeHandler(event.target.value)}>
          <option value="">Select author please</option>
          {
            this.state.authors.map(author => {
              return <option key={author.id} value={author.id}>{author.fullName}</option>
            })
          }
        </select>
      </div>
      <div>
        <button style={{marginTop: "5px"}} className="btn btn-success" type="submit">Submit</button>
      </div>
    </form>
    );
  }
}