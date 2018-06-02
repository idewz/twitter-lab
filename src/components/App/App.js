import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import yellow from '@material-ui/core/colors/yellow';

import AppSearchBar from './AppSearchBar';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleQueryChange(event) {
    const query = event.target.value;
    this.setState({ query });
  }

  handleSearchClick() {
    console.log('searching for ' + encodeURIComponent(this.state.query));
  }

  render() {
    const { classes } = this.props;

    return (
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
