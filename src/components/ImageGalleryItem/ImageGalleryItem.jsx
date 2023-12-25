import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';


export default class ImageGalleryItem extends Component {
  state = {
    showModal: false, 
  };


  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal, 
    }));
  };

  render() {
    const { showModal } = this.state; 
    const { image } = this.props; 

    return (
      <div>
        <li className={css.ImageGalleryItem}>
          <img
            className={css.ImageGalleryItemImg}
            src={image.webformatURL} 
            alt={image.tags} 
            onClick={this.toggleModal} 
          />
          {showModal && ( 
            <Modal
              largeImageURL={image.largeImageURL} 
              tags={image.tags} 
              onClose={this.toggleModal} 
            />
          )}
        </li>
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
}