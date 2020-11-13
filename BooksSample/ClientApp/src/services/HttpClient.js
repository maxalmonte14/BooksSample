export class HttpClient {
  constructor() {
    this.ROOT_URL = "http://localhost:5000/api";
  }

  getBooks() {
    return fetch(`${this.ROOT_URL}/books`, {
      headers: {
        accept: "application/json"
      }
    })
    .then(response => response.json());
  }

  deleteBook(id) {
    return fetch(`${this.ROOT_URL}/books/${id}`, {
      method: "delete",
      headers: {
        accept: "application/json",
      }
    });
  }

  createBook(data) {
    return fetch(`${this.ROOT_URL}/books`, {
      method: "post",
      headers: {
        accept: "application/json",
        'Content-Type': "application/json",
      },
      body: JSON.stringify(data)
    });
  }

  getAuthors() {
    return fetch(`${this.ROOT_URL}/authors`, {
      headers: {
        accept: "application/json"
      }
    })
    .then(response => response.json());
  }

  updateBook(id, data) {
    return fetch(`${this.ROOT_URL}/books/${id}`, {
      method: "put",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
  }

  getAuthor(id) {
    return fetch(`${this.ROOT_URL}/authors/${id}`, {
      headers: {
        accept: "application/json"
      }
    });
  }
}

export default new HttpClient();