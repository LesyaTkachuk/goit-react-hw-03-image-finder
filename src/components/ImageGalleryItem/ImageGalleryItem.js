import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.scss";

function ImageGalleryItem({ image, showModal }) {
  const { webformatURL, largeImageURL } = image;
  return (
    <li className={styles.item}>
      <img
        src={webformatURL}
        alt=""
        className={styles.image}
        onClick={() => showModal(largeImageURL)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
