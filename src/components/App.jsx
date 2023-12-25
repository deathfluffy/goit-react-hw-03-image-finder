import React, { Component } from 'react';
import css from './App.module.css';
import * as API from '../ServicesApi/Api';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast, Slide } from 'react-toastify';

export default class App extends Component {

  state = {
    searchName: '', 
    images: [], 
    currentPage: 1, 
    error: null, 
    isLoading: false, 
  };

  
  componentDidUpdate(_, prevState) {
   
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages(); 
    }
  }

 
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

 
  handleSubmit = query => {
    this.setState({
      searchName: query, 
      images: [], 
      currentPage: 1, 
    });
  };

  
  addImages = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true }); 

    
      const data = await API.getImages(searchName, currentPage);

      if (data.hits.length === 0) {
        
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

     
      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages], 
        isLoading: false, 
        error: '', 
        totalPages: Math.ceil(data.totalHits / 12), 
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' }); 
    } finally {
      this.setState({ isLoading: false }); 
    }
  };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;

    return (
      <div className={css.App}>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
            Image gallery is empty... 📷
          </p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} /> 
        )}
      </div>
      
    );
  }
}