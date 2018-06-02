import axios from 'axios';

/**
 * Simple Twitter REST API client
 */
class Twitter {
  /**
   * Search for tweets matching a given query
   *
   * @param {string} query Query string
   * @param {number} [count] Number of tweets
   * @returns {object} Response object, or empty object if error
   */
  static async search(query, count) {
    const params = {
      q: encodeURIComponent(query),
      count,
    };

    try {
      const response = await axios.get('https://twitter.siwadon.com/api/search', { params });
      return response.data;
    } catch (e) {
      console.error(e);
      return {};
    }
  }
}

export default Twitter;
