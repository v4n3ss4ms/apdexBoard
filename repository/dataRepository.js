const FAKE_API = '/repository/host-app-data.json';

export class DataRepository {
  constructor(fetch) {
    this.fetch = fetch;
    this.data = null;
  }

  getData() {
    if (this.data) {
      return this.data;
    } else {
      return fetch(FAKE_API)
        .then((res) => res.json())
        .then((res) => (this.data = res));
    }
  }
}
