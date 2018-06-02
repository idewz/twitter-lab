import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import yellow from '@material-ui/core/colors/yellow';

import './App.css';
import AppSearchBar from './AppSearchBar';
import Twitter from '../../lib/Twitter';
import TweetList from '../TweetList/TweetList';

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
              <AppSearchBar
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

const styles = {
  appBar: {
    background: yellow[500],
  },
  toolbar: {
    justifyContent: 'space-between',
  },
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
