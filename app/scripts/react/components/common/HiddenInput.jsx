import React, { PropTypes } from 'react';

export default function HiddenInput(props) {
  HiddenInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  };

  return ({
    props,

    render() {
      const { name, value } = this.props;

      return (
        <input
          name={name}
          type="hidden"
          value={value}
        />
      );
    },
  });
}
