import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.scss";

function ImageGallery({ images, showModal }) {
  return (
    <ul className={styles.imageGallery}>
      {images.map((image) => (
        <ImageGalleryItem key={image.id} image={image} showModal={showModal} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGallery;
