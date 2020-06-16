import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    imageURL: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <img src={this.props.imageURL} alt="" />
        </div>
      </div>
    );
  }
}
export default Modal;
