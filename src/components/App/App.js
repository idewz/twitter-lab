import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
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
      loading: false,
      query: '',
      result: {},
      sort: 'Retweet',
    };

    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.performSearch = this.performSearch.bind(this);
  }

  async componentDidMount() {
    if (process.env.CI) {
      return;
    }

    const response = await Twitter.trends();
    const trends = Array.isArray(response) ? response[0].trends : undefined;

    if (trends === undefined || trends.length === 0) {
      return;
    }

    // Random a top trend
    const randomIndex = Math.floor(Math.random() * trends.length);
    const trend = trends[randomIndex];
    this.setState({ query: trend.name }, this.performSearch);
  }

  handleCountChange(event) {
    const count = parseInt(event.target.value, 10);
    this.setState({ count }, this.performSearch);
  }

  handleQueryChange(event) {
    const query = event.target.value;
    this.setState({ query });
  }

  async performSearch() {
    if (this.state.query === '') {
      return;
    }

    let query = '';
    const hashtagFound = this.state.query.indexOf('#') !== -1;

    if (hashtagFound) {
      const keywords = this.state.query.split(' ');
      query = keywords.join(' OR ');
    } else {
      query = this.state.query;
    }

    this.setState({ loading: true });
    const response = await Twitter.search(query, this.state.count);
    this.setState({ result: response });
    this.setState({ loading: false });
  }

  handleSortChange(event) {
    const sort = event.target.value;
    this.setState({ sort });
  }

  showProgressBar() {
    return this.state.loading && Object.keys(this.state.result).length > 0;
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {this.showProgressBar() && (
          <LinearProgress classes={{ root: classes.progressRoot, bar: classes.progressBar }} />
        )}
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
                handleSearchClick={this.performSearch}
                handleSortChange={this.handleSortChange}
                query={this.state.query}
                sort={this.state.sort}
              />
            </Grid>
          </Toolbar>
        </AppBar>
        <main>
          <TweetList tweets={this.state.result.statuses} sort={this.state.sort} />
        </main>
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
    background: yellow['A700'],
  },
  progressRoot: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
  progressBar: {
    background: yellow[900],
  },
  title: {
    fontWeight: 'bold',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
};

export default withStyles(styles)(App);
