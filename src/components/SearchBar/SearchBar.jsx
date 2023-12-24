import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from '../../icon/search.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    searchQuery: ``,
  };

  handleQueryChange = ({ currentTarget: { value } }) => {
    this.setState({ searchQuery: value.toLowerCase() });
  };

  handleSubmit = e => {
    const searchQuery = this.state.searchQuery.trim();
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.info('Please, enter search word!');
      return;
    }

    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
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
            onChange={this.handleChange}
            value={this.state.name}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
