import React, { PropTypes } from 'react';
import ICheck from '../common/ICheck';

export default class PropertyValueBoolean {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  render() {
    return (
      <ICheck
        name={this.props.name}
        checked={!!this.props.property.value}
        onChange={this.props.onChange}
      />
    );
  }
}