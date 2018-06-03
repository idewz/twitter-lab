import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TweetCard from '../TweetCard/TweetCard';

/**
 * Container for tweets
 */
class TweetList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const isSameTweets = nextProps.tweets === this.props.tweets;
    const isSameSort = nextProps.sort === this.props.sort;

    return !(isSameSort && isSameTweets);
  }

  compareTweet(a, b, sortField) {
    let aTweet = a.retweeted_status || a;
    let bTweet = b.retweeted_status || b;

    return bTweet[sortField] - aTweet[sortField];
  }

  getSortField(sort) {
    const sortMap = {
      Retweet: 'retweet_count',
      Favorite: 'favorite_count',
    };

    return sortMap[sort];
  }

  renderTweet(tweet) {
    return <TweetCard key={tweet.id_str} tweet={tweet} />;
  }

  render() {
    const { classes, tweets } = this.props;

    if (tweets === undefined || tweets.length === 0) {
      return null;
    }

    const sortField = this.getSortField(this.props.sort);

    if (sortField !== undefined) {
      tweets.sort((a, b) => this.compareTweet(a, b, sortField));
    }

    return (
      <Grid container spacing={40} className={classes.container}>
        {tweets.map(tweet => this.renderTweet(tweet))}
      </Grid>
    );
  }
}

TweetList.propTypes = {
  /**
   * Class names object to override or extend style
   */
  classes: PropTypes.object.isRequired,

  /**
   * Sort option
   */
  sort: PropTypes.string,

  /**
   * An array of tweet objects
   */
  tweets: PropTypes.array,
};

TweetList.defaultProps = {
  sort: 'Retweet',
  tweets: [],
};

const styles = {
  container: {
    margin: '0 auto',
  },
};

export default withStyles(styles)(TweetList);
