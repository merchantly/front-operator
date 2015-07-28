import React, { PropTypes } from 'react';
import numeral from 'numeral';

export default class PropertyValueFile {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  render() {
    const { value } = this.props.property;
    if (value && typeof value === 'object') {
      return (
        <span>
          <input
            type="hidden"
            name={this.props.name}
            value={value.filename}
          />
          <a href={value.url} target="_blank">
            {value.filename}
          </a>
          <span className="text-muted">
            {} ({numeral(value.size).format('0 b')})
          </span>
        </span>
      );
    } else {
      return (
        <input
          type="file"
          name={this.props.name}
          className="file form-control"
          onChange={this.handleChange.bind(this)}
        />
      );
    }
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
}