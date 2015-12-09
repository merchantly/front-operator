import React, { Component, PropTypes } from 'react';
import ICheck from '../common/ICheck';

class PropertyValueBoolean extends Component {
  render() {
    const { name, onChange, property } = this.props;

    return (
      <ICheck
        checked={!!property.value}
        name={name}
        onChange={onChange}
      />
    );
  }
}

PropertyValueBoolean.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  property: PropTypes.object.isRequired,
};

export default PropertyValueBoolean;