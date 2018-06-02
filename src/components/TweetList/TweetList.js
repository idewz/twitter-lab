import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TwitterCard from '../TwitterCard/TwitterCard';

class TweetList extends Component {
  renderTweet(tweet) {
    return <TwitterCard key={tweet.id_str} tweet={tweet} />;
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
  classes: PropTypes.object.isRequired,
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
