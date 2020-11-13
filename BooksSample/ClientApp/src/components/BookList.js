import React from 'react';
import BookCard from './BookCard';
import { SearchBox } from './SearchBox';
import HttpClient from '../services/HttpClient';

export class BookList extends React.Component {
	constructor(props) {
		super(props);

		this.state = { books: [], searchResults: [] };
		this.onBookDeletedHandler = this.onBookDeletedHandler.bind(this);
		this.onBookDeletedFailureHandler = this.onBookDeletedFailureHandler.bind(this);
	}

	componentDidMount() {
		HttpClient.getBooks().then(json => this.setState({ books: json }));
	}

	onBookDeletedHandler(id) {
		this.setState({ books: this.state.books.filter(book => book.id != id) });
	}

	onEnterPressedHandler(id) {
		this.setState({searchResults: this.state.books.filter(book => book.id == id)});
	}

	onBookDeletedFailureHandler(data) {
		alert(data);
	}

	render() {
		const books = (this.state.searchResults.length > 0)
									? this.state.searchResults
									: this.state.books;

		return (
			<div>
				<SearchBox onEnterPressed={(id) => this.onEnterPressedHandler(id)}/>
				{books.map(book => {
						return <BookCard
										key={book.id}
										book={book}
										onDelete={(id) => this.onBookDeletedHandler(id)}
										onDeleteFailure={(data => this.onBookDeletedFailureHandler(data))}/>
				})}
			</div>
		);
	}
}