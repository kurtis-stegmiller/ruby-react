import React from "react";
import PropTypes from "prop-types";

const Modal = ({ children, open, close, customClass }) => {
  if (open) {
    document.body.style.overflow = "hidden";
    return (
      <div className="modal">
        <div className="modal_ovarlay" onClick={close}></div>
        <div className={`modal_content ${customClass && customClass}`}>
          {children}
        </div>
      </div>
    );
  } else {
    document.body.style.overflow = "auto";

    return "";
  }
};

Modal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node,
  customClass: PropTypes.string
};

export default Modal;
