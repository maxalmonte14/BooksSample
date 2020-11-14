import React from 'react';
import BookForm from './BookForm';

export default function CreateBookForm() {
  return (
    <BookForm initialState={{
        selectedAuthorId: '',
        title: '',
        year: '',
        pagesCount: ''
      }} type="create"/>
    );
  }