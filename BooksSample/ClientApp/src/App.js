import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { BookList } from './components/BookList';
import { BookDetails } from './components/BookDetails';
import { CreateBookForm } from './components/CreateBookForm';
import { EditBookForm } from './components/EditBookForm';

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
