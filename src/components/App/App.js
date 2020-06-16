import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";

import Searchbar from "../Searchbar/Searchbar";
import Loader from "react-loader-spinner";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import picturesApi from "../../api/picturesApi";

import styles from "./App.module.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  state = {
    images: [],
    query: "",
    isLoading: false,
    page: 1,
    imageUrlForModal: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const { query } = this.state;

    if (prevQuery !== query) {
      this.fetchImages();
    }
  }

  inputQuery = (query) => {
    if (!query) {
      this.showNotif("Please, enter some query");
      return;
    }
    this.setState({ query, images: [], page: 1 });
  };

  fetchImages = () => {
    this.setState({ isLoading: true });
    const { query, page } = this.state;

    picturesApi
      .fetchPicturesByQuery(query, page)
      .then((pictures) => {
        if (pictures.length === 0) {
          this.showNotif("No matches");
          return;
        }
        this.setState((prevState) => ({
          images: [...prevState.images, ...pictures],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.showNotif(`Woops...${error.message}`))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  showNotif = (message) => {
    this.setState({ showNotif: true });
    toast.dark(`🦄 ${message}`, {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  showModal = (imageURL) => {
    this.setState({ imageUrlForModal: imageURL });
  };

  closeModal = () => {
    this.setState({ imageUrlForModal: "" });
  };

  render() {
    const { images, isLoading, imageUrlForModal } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.inputQuery} />
        {images.length > 0 && (
          <ImageGallery images={images} showModal={this.showModal} />
        )}

        {isLoading && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}
        {imageUrlForModal && (
          <Modal imageURL={imageUrlForModal} onClose={this.closeModal} />
        )}

        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
