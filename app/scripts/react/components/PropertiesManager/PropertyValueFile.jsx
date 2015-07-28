import React, { PropTypes } from 'react';
import numeral from 'numeral';

export default class PropertyValueFile {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  render() {
    return (
      <span>
        <Col {...this.getFileColProps.call(this)} className="p-l-none">
          <input
            type="file"
            name={this.props.name}
            className="file form-control"
            onChange={this.handleChange.bind(this)}
          />
        </Col>
        {this.renderExistingFile.call(this)}
      </span>
    );
  }
  renderExistingFile() {
    const { value } = this.props.property;

    if (value && typeof value === 'object') {
      return (
        <Col sm={4} md={5} lg={6}>
          <a href={value.url} target="_blank">
            {value.filename}
          </a>
          <span className="text-muted text-nowrap">
            {} ({numeral(value.size).format('0 b')})
          </span>
          <input
            type="hidden"
            name={this.props.name}
            value={value.filename}
          />
        </Col>
      );
    }
  }
  getFileColProps() {
    const { value } = this.props.property;

    if (value && typeof value === 'object') {
      return { sm: 4, md: 5, lg: 6 };
    } else {
      return {};
    }
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
}