import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
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
      query: '',
      result: {},
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleQueryChange(event) {
    const query = event.target.value;
    this.setState({ query });
  }

  async handleSearchClick() {
    const response = await Twitter.search(this.state.query);
    this.setState({ result: response });
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Grid item>
              <Typography variant="title" color="inherit">
                Twitter Content Lab
              </Typography>
            </Grid>
            <Grid item>
              <SearchBar
                handleQueryChange={this.handleQueryChange}
                handleSearchClick={this.handleSearchClick}
                query={this.state.query}
              />
            </Grid>
          </Toolbar>
        </AppBar>
        <TweetList tweets={this.state.result.statuses} />
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
  toolbar: {
    justifyContent: 'space-between',
  },
};

export default withStyles(styles)(App);
