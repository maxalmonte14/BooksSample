import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import SearchBox from './SearchBox';
import HttpClient from '../services/HttpClient';

export default function BookList() {
	const [books, updateBooks] = useState([]);
	const [searchResults, updatesearchResults] = useState([]);

	useEffect(() => {
		HttpClient.getBooks().then(json => updateBooks(json));
	}, []);

	function onBookDeletedHandler(id) {
		updateBooks(books.filter(book => book.id != id));
	}

	function onEnterPressedHandler(id) {
		updatesearchResults(books.filter(book => book.id == id));
	}

	function onBookDeletedFailureHandler(data) {
		alert(data);
	}

	const bookCollection = (searchResults.length > 0) ? searchResults : books;
	const booksToShow = bookCollection.map(book => {
		return <BookCard
						key={book.id}
						book={book}
						onDelete={(id) => onBookDeletedHandler(id)}
						onDeleteFailure={(data => onBookDeletedFailureHandler(data))}/>
	});

	return (
		<div>
			<SearchBox onEnterPressed={(id) => onEnterPressedHandler(id)}/>
			{booksToShow}
		</div>
	);
}