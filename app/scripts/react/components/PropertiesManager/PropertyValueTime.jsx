import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

//TODO: i18n
const PROPERTY_VALUE_TIME_PLACEHOLDER = 'Укажите дату и время';

export default class PropertyValueTime {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  componentDidMount() {
    const node = findDOMNode(this);
    $(node).on('dp.change', this.handleDateChange.bind(this));
  }
  componentWillUnmount() {
    const node = findDOMNode(this);
    $(node).off('dp.change', this.handleDateChange.bind(this));
  }
  render() {
    return (
      <div className="input-group date">
        <input
          type="text"
          name={this.props.name}
          defaultValue={this.props.property.value}
          placeholder={PROPERTY_VALUE_TIME_PLACEHOLDER}
          className="form-control"
        />
        <span className="input-group-addon">
          <i className="fa fa-calendar" />
        </span>
      </div>
    );
  }
  handleDateChange(date) {
    this.props.onChange(date.date.format());
  }
  handleInputChange(e) {
    this.props.onChange(e.target.value);
  }
}
