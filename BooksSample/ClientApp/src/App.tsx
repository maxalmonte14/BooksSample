import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import BookList from './features/books/BookList';
import BookDetails from './features/books/BookDetails';
import CreateBookForm from './features/books/CreateBookForm';
import EditBookForm from './features/books/EditBookForm';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={BookList} />
        <Route exact path='/create' component={CreateBookForm} />
        <Route exact path='/books/:id' component={BookDetails} />
        <Route path='/books/:id/edit' component={EditBookForm} />
      </Layout>
    );
  }
}
