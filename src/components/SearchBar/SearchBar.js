import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input/Input';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

/**
 * Search bar
 */
class AppSearch extends Component {
  constructor() {
    super();

    this.countOptions = [20, 50, 100];
    this.sortOptions = ['Retweet', 'Favorite', 'Date'];

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.props.handleSearchClick();
      event.preventDefault();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.form} noValidate autoComplete="off">
        <Grid item xs={12} sm={6} className={classes.searchContainer}>
          <Input
            id="search-box"
            placeholder="Search"
            fullWidth
            className={classes.search}
            value={this.props.query}
            onKeyDown={this.handleKeyDown}
            onChange={this.props.handleQueryChange}
            endAdornment={
              <IconButton aria-label="Search" onClick={this.props.handleSearchClick}>
                <SearchIcon />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            id="select-count"
            select
            label="# of tweets"
            value={this.props.count}
            classes={{ root: classes.textField }}
            onChange={this.props.handleCountChange}
            SelectProps={{ native: true }}
            margin="normal"
          >
            {this.countOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            id="select-sort"
            select
            label="Sort by"
            classes={{ root: classes.textField }}
            value={this.props.sort}
            onChange={this.props.handleSortChange}
            SelectProps={{ native: true }}
            margin="normal"
          >
            {this.sortOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Grid>
      </form>
    );
  }
}

AppSearch.propTypes = {
  /**
   * Class names object to override or extend style
   */
  classes: PropTypes.object.isRequired,

  /**
   * Number of tweets in search result
   */
  count: PropTypes.number,

  /**
   * Count option changed handler function
   */
  handleCountChange: PropTypes.func.isRequired,

  /**
   * Search query changed handler function
   */
  handleQueryChange: PropTypes.func.isRequired,

  /**
   * Search button clicked handler function
   */
  handleSearchClick: PropTypes.func.isRequired,

  /**
   * Sort option changed handler function
   */
  handleSortChange: PropTypes.func.isRequired,

  /**
   * Query string used for searching
   */
  query: PropTypes.string,

  /**
   * Sort option
   */
  sort: PropTypes.string,
};

AppSearch.defaultProps = {
  count: 20,
  query: '',
  sort: 'Retweet',
};

const styles = theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  search: {
    font: 'inherit',
    whiteSpace: 'normal',
    background: 'none',
    color: 'inherit',
  },
  searchContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    width: 100,
  },
});

export default withStyles(styles)(AppSearch);
