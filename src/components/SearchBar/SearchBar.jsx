import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from '../../icon/search.svg';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default class SearchBar extends Component {
  state = {
    inputValue: '',
    query: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

handleSubmit = e => {
  e.preventDefault();
  const query = this.state.inputValue.trim();
  
  if (this.state.query.toLowerCase() === query.toLowerCase()) {
    toast.info(`You're already viewing images for ${query}!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }

  this.setState({
    query,
    inputValue: '', 
  });

  this.props.onSubmit(query);
};



  render() {
    return (
      <header className={css.Searchbar}>
        <form
          className={css.SearchForm}
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <button type="submit" className={css.SearchFormButton}>
            <SearchIcon />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
