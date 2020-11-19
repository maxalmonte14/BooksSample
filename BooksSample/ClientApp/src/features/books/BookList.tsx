import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import SearchBox from '../../components/SearchBox';
import { Book } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, selectAllBooks } from './bookSlice';
import { AppDispatch, AppState } from '../../reducers';

export default function BookList() {
	const [searchResults, updatesearchResults] = useState([] as Array<Book>);
	const dispatch = useDispatch<AppDispatch>();
	const books = useSelector<AppState, Array<Book>>(selectAllBooks);

	useEffect(() => {
		if (books.length === 0) {
			dispatch(fetchBooks());
		}
	}, [dispatch, books.length]);

	const onEnterPressedHandler = (id: string) => {
		updatesearchResults(books.filter((book: Book) => book.id === id));
	}

	const bookCollection = (searchResults.length > 0) ? searchResults : books;
	const booksToShow = bookCollection.map((book: Book) => {
		return <BookCard key={book.id} book={book} />
	});

	return (
		<div>
			<SearchBox onEnterPressed={(id: string) => onEnterPressedHandler(id)} />
			{booksToShow}
		</div>
	);
}