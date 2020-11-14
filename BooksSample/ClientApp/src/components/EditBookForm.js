import React from 'react';
import BookForm from './BookForm';

export default function EditBookForm(props) {
  return (
    <BookForm initialState={{
        bookId: props.location.state.id,
        selectedAuthorId: props.location.state.authorId,
        title: props.location.state.title,
        year: props.location.state.year,
        pagesCount: props.location.state.pagesCount
      }} type="update"/>
    );
}