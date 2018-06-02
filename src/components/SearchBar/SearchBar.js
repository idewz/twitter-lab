import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input/Input';
import { withStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

/**
 * Search bar
 *
 * TODO: Support Enter keypress
 */
class AppSearch extends Component {
  render() {
    const { classes } = this.props;

    return (
      <FormControl>
        <Input
          placeholder="Search"
          className={classes.search}
          value={this.props.query}
          onChange={this.props.handleQueryChange}
          endAdornment={
            <IconButton
              aria-label="Toggle password visibility"
              onClick={this.props.handleSearchClick}
            >
              <SearchIcon />
            </IconButton>
          }
        />
      </FormControl>
    );
  }
}

AppSearch.propTypes = {
  /**
   * Class names object to override or extend style
   */
  classes: PropTypes.object.isRequired,

  /**
   * Search query changed handler function
   */
  handleQueryChange: PropTypes.func.isRequired,

  /**
   * Search button clicked handler function
   */
  handleSearchClick: PropTypes.func.isRequired,

  /**
   * Query string used for searching
   */
  query: PropTypes.string,
};

AppSearch.defaultProps = {
  query: '',
};

const styles = theme => ({
  search: {
    margin: 0, // Reset for Safari
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
});

export default withStyles(styles)(AppSearch);
