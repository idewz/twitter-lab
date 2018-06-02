import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TweetCard from '../TweetCard/TweetCard';

/**
 * Container for tweets
 */
class TweetList extends Component {
  renderTweet(tweet) {
    return <TweetCard key={tweet.id_str} tweet={tweet} />;
  }

  render() {
    const { classes, tweets } = this.props;

    if (tweets === undefined || tweets.length === 0) {
      return null;
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
   * An array of tweet objects
   */
  tweets: PropTypes.array,
};

TweetList.defaultProps = {
  tweets: [],
};

const styles = {
  container: {
    margin: '0 auto',
  },
};

export default withStyles(styles)(TweetList);
