import * as cors from 'cors';
import * as functions from 'firebase-functions';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.twitter.com/1.1';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + functions.config().twitter.token;
const DEFAULT_NUMBER_OF_TWEETS = 20;
const corsHandler = cors({ origin: '*' });

/**
 * Search tweets endpoint
 *
 * If success, it will return N tweets matching the query. Otherwise, responses with an appropriate error.
 */
export const search = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    if (request.query.q === undefined || request.query.q === '') {
      response.status(400).send('Missing q parameter');
      return;
    }

    const { q, count, include_entities } = request.query;
    const url = '/search/tweets.json';
    const params = {
      q,
      count: count || DEFAULT_NUMBER_OF_TWEETS,
      include_entities,
    };

    axios
      .get(url, { params })
      .then(twitterResponse => {
        response.json(twitterResponse.data);
      })
      .catch(error => {
        console.log(error);
        response.status(500).json({ status: 500, message: 'Something went wrong' });
      });
  });
});

/**
 * Get global trends
 */
export const trends = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    const url = '/trends/place.json';
    const params = { id: request.query.woeid || 1 };

    axios
      .get(url, { params })
      .then(twitterResponse => {
        response.json(twitterResponse.data);
      })
      .catch(error => {
        console.log(error);
        response.status(500).json({ status: 500, message: 'Something went wrong' });
      });
  });
});
