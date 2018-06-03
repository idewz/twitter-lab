import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
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
      <Grid item xs={12} md={6} lg={4} xl={3} className={classes.gridItem}>
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
            <Grid item xs={1}>
              <FavoriteIcon className={classNames(classes.icon, 'pink')} titleAccess="Favorites" />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="left" classes={{ root: classes.number }}>
                {tweet.favorite_count}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <RepeatIcon className={classNames(classes.icon, 'green')} titleAccess="Retweets" />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="left" classes={{ root: classes.number }}>
                {tweet.retweet_count.toLocaleString()}
              </Typography>
            </Grid>
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
  actions: {
    display: 'flex',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    backgroundColor: red[500],
  },
  card: {
    borderRadius: 16,
    maxWidth: 400,
    minHeight: 160,
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    fontSize: 20,
    verticalAlign: 'middle',

    '&.pink': {
      fill: pink[400],
    },
    '&.green': {
      fill: green[400],
    },
  },
  number: {
    fontWeight: 'bold',
    color: grey[800],
  },
});

export default withStyles(styles)(TwitterCard);
