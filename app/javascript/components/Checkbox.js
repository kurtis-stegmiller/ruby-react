import React from "react";
import CheckboxSimple from "react-simple-checkbox";
import PropTypes from "prop-types";

const Checkbox = ({handleChecked, checked}) => {
  return (
    <CheckboxSimple
      checked={checked}
      onChange={() => handleChecked(!checked)}
      className="checkbox"
    />
  );
};

Checkbox.propTypes = {
  handleChecked: PropTypes.func,
  checked: PropTypes.bool
};

export default Checkbox;
