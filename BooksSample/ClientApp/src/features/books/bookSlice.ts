import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../../reducers';
import { Book, ErrorResponse } from '../../types';

interface DeleteBookResult {
  id: string,
  status: number
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (): Promise<Book|ErrorResponse> => {
  const response = await fetch('http://localhost:5000/api/books', {
    headers: {
      accept: "application/json"
    }
  });

  return await response.json();
});
export const deleteBook = createAsyncThunk('books/deleteBook', async (id: string): Promise<DeleteBookResult|ErrorResponse> => {
  const response = await fetch(`http://localhost:5000/api/books/${id}`, {
    method: 'delete',
    headers: {
      accept: 'application/json',
    }
  });

  return { id, status: response.status };
});
export const createBook = createAsyncThunk('books/createBook', async (data: Book): Promise<Book|ErrorResponse> => {
  const response = await fetch('http://localhost:5000/api/books', {
    method: 'post',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
});
export const updateBook = createAsyncThunk('books/updateBook', async (data: Book): Promise<Book|ErrorResponse> => {
  const response = await fetch(`http://localhost:5000/api/books/${data.id}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
});

export const bookSlice = createSlice({
  name: 'books',
  initialState: {
    data: [] as Book[]
  },
  reducers: {},
  extraReducers: {
    [fetchBooks.fulfilled.toString()]: (state, action) => {
      console.log(fetchBooks.fulfilled.toString(), state, action);
      state.data = state.data.concat(action.payload)
    },
    [deleteBook.fulfilled.toString()]: (state, action) => {
      state.data = state.data.filter(book => book.id !== action.payload.id);
    },
    [createBook.fulfilled.toString()]: (state, action) => {
      state.data.push(action.payload);
    },
    [updateBook.fulfilled.toString()]: (state, action) => {
      const index = state.data.findIndex((b:Book) => b.id === action.payload.id);
      state.data[index] = action.payload;
    }
  }
});

export const selectAllBooks = (state: AppState): Array<Book> => state.books.data;
export const selectBookById = (state: AppState, bookId: string): Book|undefined => {
  return state.books.data.find((book: Book) => book.id === bookId);
}
export const removeBookById = (state: AppState, bookId: string): void => {
  state.books.data.filter((book: Book) => book.id !== bookId);
}
export const bookReducer = bookSlice.reducer;