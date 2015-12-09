import React, { Component, PropTypes } from 'react';

class HiddenInput extends Component {
  render() {
    const { name, value } = this.props;

    return (
      <input
        name={name}
        type="hidden"
        value={value}
      />
    );
  }
}

HiddenInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default HiddenInput;