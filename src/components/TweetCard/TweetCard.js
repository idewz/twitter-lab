import React, { Component, Fragment } from 'react';
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

import { BASE_URL_HASHTAG, BASE_URL_STATUS, DATE_FORMAT } from '../../lib/Twitter';

/**
 * Tweet card showing basic tweet information including
 * text, user name, time, retweet and favorite counts.
 */
class TwitterCard extends Component {
  constructor(props) {
    super(props);

    this.isRetweet = props.tweet.retweeted_status !== undefined;
    this.isQuote = props.tweet.is_quote_status;
    this.mainTweet = this.isRetweet ? props.tweet.retweeted_status : props.tweet;
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

  formatText(text, entities) {
    const hashtags = entities.hashtags;
    let parts = [];
    let current = 0;

    // decorate each tag with its link
    if (hashtags !== undefined && hashtags.length !== 0) {
      hashtags.forEach(tag => {
        parts.push(text.slice(current, tag.indices[0]));
        parts.push(this.renderHashTag(tag.text));
        current = tag.indices[1];
      });

      if (current < text.length) {
        parts.push(text.slice(current));
      }
    } else {
      parts.push(text);
    }

    return parts;
  }

  getUser() {
    return this.mainTweet.user;
  }

  handleHashTagClick(e) {
    e.stopPropagation();
  }

  openTweet(id) {
    window.open(BASE_URL_STATUS + id);
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
    const { classes } = this.props;
    const created_at = this.mainTweet.created_at;
    const tweetUrl = BASE_URL_STATUS + this.mainTweet.id_str;
    const formattedDate = this.formatDate(created_at);

    return (
      <a href={tweetUrl} className={classes.subheader}>
        {formattedDate}
      </a>
    );
  }

  renderFavoriteCount() {
    return this.mainTweet.favorite_count.toLocaleString();
  }

  renderHashTag(tag) {
    return (
      <a
        href={BASE_URL_HASHTAG + tag}
        className={this.props.classes.hashtag}
        onClick={this.handleHashTagClick}
      >
        #{tag}
      </a>
    );
  }

  renderRetweetCount() {
    return this.mainTweet.retweet_count.toLocaleString();
  }

  renderText() {
    const text = this.mainTweet.text;
    const entities = this.mainTweet.entities;

    return this.formatText(text, entities).map((elem, i) => <Fragment key={i}>{elem}</Fragment>);
  }

  render() {
    const { classes, tweet } = this.props;

    return (
      <Grid item xs={12} sm={6} md={4} xl={3} className={classes.gridItem}>
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
            classes={{ root: classes.cardHeader, title: classes.username }}
          />

          <CardContent className={classes.cardContent} onClick={() => this.openTweet(tweet.id_str)}>
            <Typography component="p">{this.renderText()}</Typography>
          </CardContent>

          <CardActions className={classes.actions} disableActionSpacing>
            <Grid item xs={1}>
              <FavoriteIcon className={classNames(classes.icon, 'pink')} titleAccess="Favorites" />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="left" classes={{ root: classes.number }}>
                {this.renderFavoriteCount()}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <RepeatIcon className={classNames(classes.icon, 'green')} titleAccess="Retweets" />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="left" classes={{ root: classes.number }}>
                {this.renderRetweetCount()}
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
  }).isRequired,
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
    maxWidth: 372,
    minHeight: 160,
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
    cursor: 'pointer',
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  hashtag: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
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
  username: {
    fontWeight: 'bold',
  },
});

export default withStyles(styles)(TwitterCard);
