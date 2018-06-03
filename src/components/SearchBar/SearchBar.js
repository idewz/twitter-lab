import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <Input
          id="search-box"
          placeholder="Search"
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
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    font: 'inherit',
    whiteSpace: 'normal',
    background: 'none',
    color: 'inherit',

    '& input': {
      width: 100,
      transition: theme.transitions.create('width'),
    },

    '& input:focus': {
      width: 120,
    },

    [theme.breakpoints.up('sm')]: {
      '& input': {
        width: 160,
      },

      '& input:focus': {
        width: 300,
      },
    },

    '&:focus': {
      outline: 0,
    },
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
