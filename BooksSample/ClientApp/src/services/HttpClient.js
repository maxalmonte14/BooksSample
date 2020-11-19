export class HttpClient {
  constructor() {
    this.ROOT_URL = 'http://localhost:5000/api';
  }

  getAuthors() {
    return fetch(`${this.ROOT_URL}/authors`, {
      headers: {
        accept: 'application/json'
      }
    })
    .then(response => response.json());
  }

  getAuthor(id) {
    return fetch(`${this.ROOT_URL}/authors/${id}`, {
      headers: {
        accept: 'application/json'
      }
    });
  }
}

export default new HttpClient();