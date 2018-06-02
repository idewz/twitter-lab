import axios from 'axios';

class Twitter {
  static async search(query) {
    const params = { q: encodeURIComponent(query) };

    try {
      const response = await axios.get('https://twitter.siwadon.com/api/search', { params });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}

export default Twitter;
