import React from 'react';
import HttpClient from '../services/HttpClient';

export class BookDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = { author: null };
  }

  componentDidMount() {
    HttpClient.getAuthor(this.props.location.state.authorId)
              .then(response => {
                if(response.status != 200) {
                  throw new Error();
                }

                return response.json();
              })
              .then(json => this.setState({ author: json }))
              .catch(Error => alert("The author for this book does not exist"));
  }

  render() {
    return (
      <div>
        <h2>Title: {this.props.location.state.title}</h2>

        <p><b>Year:</b> {this.props.location.state.year}</p>
        <p><b># of pages:</b> {this.props.location.state.pagesCount}</p>

        <h3>Author information</h3>
        <p><b>Full name:</b> { this.state.author != null ? this.state.author.fullName : null}</p>
      </div>
    );
  }
}