import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');


export default class Modal extends Component {
  
componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown); 
    document.body.style.overflow = 'visible';
  }

  
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose(); 
    }
  };

  
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose(); 
    }
  };
  render() {
  const { largeImageURL, tags } = this.props;
  return createPortal(
    <div className={css.Overlay} onClick={this.handleBackdropClick}>
      <div>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};