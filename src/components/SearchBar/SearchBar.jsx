import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from '../../icon/search.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = { name: '' };

  handleChange = e => {
    this.setState({ name: e.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name } = this.state;
    const { onSubmit } = this.props;

    if (name === '') {
      toast.error('Enter what you want to find please');
      return;
    }

    onSubmit(name);
    this.setState({ name: '' });
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
