import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles, Hidden } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import yellow from '@material-ui/core/colors/yellow';

import SearchBar from '../SearchBar';
import Twitter from '../../lib/Twitter';
import TweetList from '../TweetList/TweetList';

/**
 * Main component for our app
 */
class App extends Component {
  constructor() {
    super();

    this.state = {
      count: 20,
      query: '',
      result: {},
      sort: 'Retweet',
    };

    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  async componentDidMount() {
    const response = await Twitter.trends();
    const trends = response[0].trends;
    if (trends === undefined || trends.length === 0) {
      return;
    }

    // Random a top trend
    const randomIndex = Math.floor(Math.random() * trends.length * 0.25);
    const trend = trends[randomIndex];
    this.setState({ query: trend.name }, this.handleSearchClick);
  }

  handleCountChange(event) {
    const count = parseInt(event.target.value, 10);
    this.setState({ count }, this.handleSearchClick);
  }

  handleQueryChange(event) {
    const query = event.target.value;
    this.setState({ query });
  }

  async handleSearchClick() {
    if (this.state.query === '') {
      return;
    }
    const keywords = this.state.query.split(' ');
    const query = keywords.join(' OR ');
    const response = await Twitter.search(query, this.state.count);
    this.setState({ result: response });
  }

  handleSortChange(event) {
    const sort = event.target.value;
    this.setState({ sort });
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Hidden xsDown>
              <Grid item>
                <Typography variant="title" color="inherit" className={classes.title}>
                  Tweety
                </Typography>
              </Grid>
            </Hidden>
            <Grid item>
              <SearchBar
                count={this.state.count}
                handleCountChange={this.handleCountChange}
                handleQueryChange={this.handleQueryChange}
                handleSearchClick={this.handleSearchClick}
                handleSortChange={this.handleSortChange}
                query={this.state.query}
                sort={this.state.sort}
              />
            </Grid>
          </Toolbar>
        </AppBar>
        <TweetList tweets={this.state.result.statuses} sort={this.state.sort} />
      </Fragment>
    );
  }
}

App.propTypes = {
  /**
   * Class names object to override or extend style
   */
  classes: PropTypes.object.isRequired,
};

const styles = {
  appBar: {
    background: yellow[500],
  },
  title: {
    fontWeight: 'bold',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
};

export default withStyles(styles)(App);
