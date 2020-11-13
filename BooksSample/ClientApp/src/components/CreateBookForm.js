import React from 'react';
import { BookForm } from './BookForm';

export function CreateBookForm() {
  return (
    <BookForm initialState={{
        selectedAuthorId: '',
        title: '',
        year: '',
        pagesCount: ''
      }} type="create"/>
    );
  }