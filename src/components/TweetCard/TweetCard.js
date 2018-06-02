import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

import FavoriteIcon from '@material-ui/icons/Favorite';
import RepeatIcon from '@material-ui/icons/Repeat';

/**
 * Tweet card showing basic tweet information including
 * text, user name, time, retweet and favorite counts.
 */
class TwitterCard extends Component {
  render() {
    const { classes, tweet } = this.props;
    const tweetUrl = `https://twitter.com/statuses/${tweet.id_str}`;
    const date = new Date(tweet.created_at);

    return (
      <Grid item xs={12} className={classes.gridItem}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                aria-label={tweet.user.name}
                src={tweet.user.profile_image_url_https}
                className={classes.avatar}
              />
            }
            title={tweet.user.name}
            subheader={<a href={tweetUrl}>{date.toLocaleString()}</a>}
          />
          <CardContent className={classes.cardContent}>
            <Typography component="p">{tweet.text}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites" className={classes.iconButton} disabled>
              <FavoriteIcon className={classes.icon} />
            </IconButton>
            {tweet.favorite_count}
            <IconButton aria-label="Retweet" className={classes.iconButton} disabled>
              <RepeatIcon className={classes.icon} />
            </IconButton>
            {tweet.retweet_count}
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

TwitterCard.propTypes = {
  /**
   * Class names object to override or extend style
   */
  classes: PropTypes.object.isRequired,

  /**
   * Tweet object
   *
   * <https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json>
   */
  tweet: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    id_str: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

const styles = theme => ({
  card: {
    borderRadius: 16,
    maxWidth: 400,
    maxHeight: 300,
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  gridItem: {
    margin: 'auto',
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
  iconButton: {
    width: 32,
    height: 32,
  },
  icon: {
    fontSize: 16,
  },
});

export default withStyles(styles)(TwitterCard);
