import React, { useEffect, useState } from 'react';
import HttpClient from '../services/HttpClient';
import { Author, Book } from '../types';

interface Props {
  location: { state: Book }
}

export default function BookDetails(props: Props) {
  const [author, updateAuthor] = useState<Author>({} as Author);

  useEffect(() => {
    HttpClient.getAuthor(props.location.state.authorId)
    .then(response => {
      if(response.status !== 200) {
        throw new Error();
      }

      return response.json();
    })
    .then(json => updateAuthor(json))
    .catch(() => alert("The author for this book does not exist"));
  }, [props.location.state.authorId]);

  return (
    <div>
      <h2>Title: {props.location.state.title}</h2>

      <p><b>Year:</b> {props.location.state.year}</p>
      <p><b># of pages:</b> {props.location.state.pagesCount}</p>

      <h3>Author information</h3>
      <p><b>Full name:</b> {author?.fullName}</p>
    </div>
  );
}