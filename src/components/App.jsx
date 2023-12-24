import React, { Component } from 'react';
import css from './App.module.css';
import { fetchImages, PER_PAGE } from '../ServicesApi/Api';
import { Searchbar } from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    name: '',
    page: 1,
    images: [],
    loading: false,
    error: null,
    showModal: false,
    largeImage: '',
    currentImgPerPage: null,
  };

componentDidUpdate(prevProps, prevState) {
  if (prevState.name !== this.state.name || prevState.page !== this.state.page) {
    this.setState({ loading: true });

    const APIKEY = '40580294-4a69e721af793c687d9c3316d'; 

    fetch(`https://pixabay.com/api/?q=${this.state.name}&page=${this.state.page}&key=${APIKEY}&image_type=photo&orientation-horizontal&per_page=12`)
      .then(response => response.json())
      .then(data => {
        if (!data.total) {
          alert('К сожалению, по вашему запросу ничего не найдено');
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalImages: data.total,
        }));
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({ loading: false });
      });
  }
}

handleSubmit = name => {
  if (this.state.name.toLowerCase() === name.toLowerCase()) {
    alert(`Вы уже просматриваете ${name}`);
    return;
  }

  this.setState({ name: name.toLowerCase(), images: [], page: 1 });
}

onLoadMoreClick = () => {
  this.setState(prevState => ({
    page: prevState.page + 1,
  }));
}


  getImagesData = async () => {
    try {
      this.setState({ loading: true });
      const { hits, totalHits } = await fetchImages(
        this.state.page,
        this.state.name
      );
      if (totalHits === 0) {
        toast.error('Images not found ...');
        this.setState({ loading: false, currentImgPerPage: null });
        return;
      }

      const images = this.imagesArray(hits);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          currentImgPerPage: hits.length,
          page: prevState.page + 1,
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  imagesArray = data => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  openModal = largeImage => {
    this.setState({ largeImage }, () => {
      this.toggleModal();
    });
  };
  render() {
    const { images, loading, currentImgPerPage, error, showModal, largeImage } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && !error && (
          <>
            <ImageGallery images={images} onClick={this.openModal} />
            {currentImgPerPage && currentImgPerPage < PER_PAGE && (
              <p className="Message">No more pictures</p>
            )}
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
        {currentImgPerPage === PER_PAGE && !loading && (
          <Button onClick={this.onLoadMoreClick} />
          )}
        {loading && <Loader />}
      </div>
    );
  }
}
