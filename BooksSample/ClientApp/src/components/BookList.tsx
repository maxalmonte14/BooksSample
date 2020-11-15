import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import SearchBox from './SearchBox';
import HttpClient from '../services/HttpClient';
import { Book } from '../types';

export default function BookList() {
	const [books, updateBooks] = useState([]);
	const [searchResults, updatesearchResults] = useState([]);

	useEffect(() => {
		HttpClient.getBooks().then(json => updateBooks(json));
	}, []);

	const onBookDeletedHandler = (id: string) => {
		updateBooks(books.filter((book: Book) => book.id !== id));
	}

	const onEnterPressedHandler = (id: string) => {
		updatesearchResults(books.filter((book: Book) => book.id === id));
	}

	const onBookDeletedFailureHandler = (data: string) => {
		alert(data);
	}

	const bookCollection = (searchResults.length > 0) ? searchResults : books;
	const booksToShow = bookCollection.map((book: Book) => {
		return <BookCard
						key={book.id}
						book={book}
						onDelete={(id: string) => onBookDeletedHandler(id)}
						onDeleteFailure={((data: string) => onBookDeletedFailureHandler(data))}/>
	});

	return (
		<div>
			<SearchBox onEnterPressed={(id: string) => onEnterPressedHandler(id)}/>
			{booksToShow}
		</div>
	);
}