import React, { useEffect, useState } from 'react';
import HttpClient from '../../services/HttpClient';
import { Author, Book } from '../../types';

interface Props {
  initialState: Partial<Book>,
  children: JSX.Element,
  onSubmit: (book: Book) => void,
}

export default function BookForm(props: Props) {
  const initialState = props.initialState;
  const [authors, updateAuthors] = useState<Array<Author>>([] as Array<Author>);
  const [authorId, updateAuthorId] = useState<string|undefined>(initialState.authorId);
  const [title, updateTitle] = useState<string|undefined>(initialState.title);
  const [year, updateYear] = useState<string|undefined>(initialState.year);
  const [pagesCount, updatePagesCount] = useState<number|undefined>(initialState.pagesCount);

  useEffect(() => {
    HttpClient.getAuthors()
    .then(json => updateAuthors(json))
    .catch(() => alert("Sorry, there was a failure in the server while trying to load the authors, please try again."));
  }, []);

  const onTitleChangeHandler = (value: string) => {
    updateTitle(value);
  }

  const onAuthorChangeHandler = (value: string) => {
    updateAuthorId(value);
  }

  const onYearChangeHandler = (value: string) => {
    updateYear(value);
  }

  const onPagesCountChangeHandler = (value: number) => {
    updatePagesCount(value);
  }

  const onFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit({authorId, title, year, pagesCount} as Book);
  }

return (
  <form onSubmit={(event) => onFormSubmitHandler(event)}>
    <div>
      <label>Title</label>
      <input
        className="form-control"
        defaultValue={title}
        onChange={(event) => onTitleChangeHandler(event.target.value)}/>
    </div>
    <div>
      <label>Year</label>
      <input
        className="form-control"
        defaultValue={year}
        onChange={(event) => onYearChangeHandler(event.target.value)}/>
    </div>
    <div>
      <label>Pages count</label>
      <input
        className="form-control"
        defaultValue={pagesCount}
        type="number"
        onChange={(event) => onPagesCountChangeHandler(parseInt(event.target.value))}/>
    </div>
    <div>
      <label>Author</label>
      <select
        className="form-control"
        value={authorId}
        onChange={(event) => onAuthorChangeHandler(event.target.value)}>
        <option value="">Select author please</option>
        {
          authors.map(author => {
            return <option key={author.id} value={author.id}>{author.fullName}</option>
          })
        }
      </select>
    </div>
    {props.children}
  </form>
  );
}