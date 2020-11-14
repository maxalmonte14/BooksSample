import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import HttpClient from '../services/HttpClient';

export default function BookForm(props) {
  const [authors, updateAuthors] = useState([]);
  const [redirect, updateRedirect] = useState(false);
  const [selectedAuthorId, updateSelectedAuthorId] = useState(props.initialState.selectedAuthorId);
  const [title, updateTitle] = useState(props.initialState.title);
  const [year, updateYear] = useState(props.initialState.year);
  const [pagesCount, updatePagesCount] = useState(props.initialState.pagesCount);

  useEffect(() => {
    HttpClient.getAuthors()
    .then(json => updateAuthors(json))
    .catch(() => alert("Sorry, there was a failure in the server while trying to load the authors, please try again."));
  }, []);

  function onTitleChangeHandler(value) {
    updateTitle(value);
  }

  function onAuthorChangeHandler(value) {
    updateSelectedAuthorId(value);
  }

  function onYearChangeHandler(value) {
    updateYear(value);
  }

  function onPagesCountChangeHandler(value) {
    updatePagesCount(value);
  }

  function onFormSubmitHandler(event) {
    event.preventDefault();

    if (props.type == "update") {
      updateBook();
    } else if (props.type == "create") {
      createBook();
    }
  }

  function createBook() {
    if (modelStateIsValid()) {
      HttpClient.createBook({
        name: title,
        authorId: selectedAuthorId,
        year: year,
        pagesCount: parseInt(pagesCount),
      })
      .then(response => {
        if(response.status == 201) {
          updateRedirect(true);
        } else if(response.status == 400) {
          alert("The data you submitted is not valid, please try again.");
        } else if(response.status == 500) {
          alert("Sorry, there was a failure in the server, please try again.");
        }
      });
    }
  }

  function updateBook() {
    if (modelStateIsValid()) {
      HttpClient.updateBook(props.initialState.bookId, {
        name: title,
        authorId: selectedAuthorId,
        year: year,
        pagesCount: parseInt(pagesCount),
      })
      .then(response => {
        if(response.status == 200) {
          updateRedirect(true);
        } else if(response.status == 400) {
          alert("The data you submitted is not valid, please try again.");
        } else if(response.status == 404) {
          props.onDeleteFailure("The book you're trying to update doest not exist.");
        } else if(response.status == 500) {
          alert("Sorry, there was a failure in the server, please try again.");
        }
      });
    }
  }

  function modelStateIsValid() {
    return [title, selectedAuthorId, year, pagesCount].every(e => e != null);
  }

if (redirect) {
  return <Redirect push to="/" />;
}

return (
  <form onSubmit={(event) => onFormSubmitHandler(event)}>
    <div>
      <label>Title</label>
      <input
        className="form-control"
        value={title}
        onChange={(event) => onTitleChangeHandler(event.target.value)}/>
    </div>
    <div>
      <label>Year</label>
      <input
        className="form-control"
        value={year}
        onChange={(event) => onYearChangeHandler(event.target.value)}/>
    </div>
    <div>
      <label>Pages count</label>
      <input
        className="form-control"
        value={pagesCount}
        type="number"
        onChange={(event) => onPagesCountChangeHandler(event.target.value)}/>
    </div>
    <div>
      <label>Author</label>
      <select
        className="form-control"
        value={selectedAuthorId}
        onChange={(event) => onAuthorChangeHandler(event.target.value)}>
        <option value="">Select author please</option>
        {
          authors.map(author => {
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