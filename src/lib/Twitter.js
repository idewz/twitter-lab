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
      q: query,
      count,
      include_entities: true,
    };

    try {
      const response = await axios.get('https://twitter.siwadon.com/api/search', { params });
      return response.data;
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  /**
   * Get trends in San Francisco
   *
   * @todo Look up WOEID dynamically
   *
   * @returns {array} Response array from /trends/place.json
   * @see {@link https://developer.twitter.com/en/docs/trends/trends-for-location/api-reference/get-trends-place}
   */
  static async trends() {
    try {
      const params = { woeid: 2487956 };
      const response = await axios.get('https://twitter.siwadon.com/api/trends', { params });
      return response.data;
    } catch (e) {
      console.error(e);
      return {};
    }
  }
}

export const BASE_URL = 'https://twitter.com/';
export const BASE_URL_HASHTAG = 'https://twitter.com/hashtag/';
export const BASE_URL_STATUS = 'https://twitter.com/statuses/';
export const DATE_FORMAT = 'H:mm A - D MMM YYYY'; // 6:05 AM - 29 May 2018
export default Twitter;
