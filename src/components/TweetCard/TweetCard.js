import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
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

import { DATE_FORMAT } from '../../lib/Twitter';

/**
 * Tweet card showing basic tweet information including
 * text, user name, time, retweet and favorite counts.
 */
class TwitterCard extends Component {
  constructor(props) {
    super(props);

    this.isRetweet = props.tweet.retweeted_status !== undefined;
    this.isQuote = props.tweet.is_quote_status;
  }

  formatDate(dateTime) {
    const created_at = moment(dateTime);
    const now = moment();
    const duration = moment.duration(now.diff(created_at));

    if (duration.as('hours') < 24) {
      return created_at.fromNow();
    } else {
      return created_at.format(DATE_FORMAT);
    }
  }

  getUser() {
    const { tweet } = this.props;

    return this.isRetweet ? tweet.retweeted_status.user : tweet.user;
  }

  getTweetText() {
    const { tweet } = this.props;

    return this.isRetweet ? tweet.retweeted_status.text : tweet.text;
  }

  renderAvatar() {
    const { classes } = this.props;

    return (
      <Avatar
        aria-label={this.getUser().name}
        src={this.getUser().profile_image_url_https}
        className={classes.avatar}
      />
    );
  }

  renderDate() {
    const { classes, tweet } = this.props;
    const created_at = this.isRetweet ? tweet.retweeted_status.created_at : tweet.created_at;
    const tweetUrl = `https://twitter.com/statuses/${tweet.id_str}`;
    const formattedDate = this.formatDate(created_at);

    return (
      <a href={tweetUrl} className={classes.subheader}>
        {formattedDate}
      </a>
    );
  }

  render() {
    const { classes, tweet } = this.props;

    return (
      <Grid item xs={12} md={6} lg={4} xl={3} className={classes.gridItem}>
        <Card className={classes.card}>
          {(this.isRetweet || this.isQuote) && (
            <Typography variant="caption" className={classes.retweet}>
              {tweet.user.name} retweeted
            </Typography>
          )}
          <CardHeader
            avatar={this.renderAvatar()}
            title={this.getUser().name}
            subheader={this.renderDate()}
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
            <Typography component="p">{this.getTweetText()}</Typography>
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
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
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
  retweet: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px 0`,
  },
  subheader: {
    textDecoration: 'none',
    color: grey[800],
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default withStyles(styles)(TwitterCard);
