import React, { PropTypes, findDOMNode } from 'react';

export default class PropertyValueTime {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  componentDidMount() {
    const node = findDOMNode(this);

    $(node).on('dp.change', this.handleDateChange.bind(this));
    $(node).datetimepicker({
      defaultDate: this.props.property.value,
      format: 'YYYY-MM-DDTHH:mm:ssZ'
    });
  }
  componentWillUnmount() {
    const node = findDOMNode(this);

    $(node).off('dp.change', this.handleDateChange.bind(this));
    $(node).data("DateTimePicker").destroy();
  }
  render() {
    return (
      <div className="input-group date">
        <input
          type="text"
          name={this.props.name}
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