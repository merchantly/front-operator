import React, { PropTypes } from 'react';


export default class PropertyValueText {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  }
  render() {
    const { t } = this.props;

    return (
      <textarea
        name={this.props.name}
        value={this.props.property.value}
        placeholder={t('properties_manager.property_value_text_placeholder')}
        className="form-control"
        onChange={this.handleChange.bind(this)}
      />
    );
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
}