/*global $ */
import React, { PropTypes } from 'react';
import RequestStatus from '../common/RequestStatus';
import classNames from 'classnames';
import { default as Parent } from './index.jsx';

const SmartSelectDumb = function SmartSelectDumb(props) {
  SmartSelectDumb.propTypes = {
    disabled: PropTypes.bool.isRequired,
    dropup: PropTypes.bool,
    fieldName: Parent.propTypes.fieldName,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    options: Parent.propTypes.options,
    status: PropTypes.string,
    value: Parent.propTypes.value,
  };

  return ({
    props,

    componentDidMount() {
      const dropdown = this.refs.dropdown.getDOMNode();
      if (!(dropdown instanceof HTMLElement)) {
        return;
      }
      $(dropdown).on('shown.bs.dropdown', this.props.onOpen);
      $(dropdown).on('hidden.bs.dropdown', this.props.onClose);
    },

    renderOptions(options, onChange) {
      return options.map(({ color_rgb, title, value }) =>
        <li
          key={value}
          onClick={() => onChange(value)}
        >
          <a href="#">
            <span
              className="smart-select__select__option__rgb-box"
              style={{ backgroundColor: color_rgb }}
            />
            {title}
          </a>
        </li>
      );
    },

    renderValue({ color_rgb, title }, disabled) {
      const cx = classNames('btn', 'btn-default', 'dropdown-toggle', { disabled });
      return (
        <button
          className={cx}
          data-toggle="dropdown"
          style={{ backgroundColor: color_rgb }}
          type="button"
        >
          <span className="smart-select__select__value">{title}</span>
          <span className="caret" />
        </button>
      );
    },

    render() {
      const { disabled, dropup, onChange, options, status, value } = this.props;
      const selected = options.filter((el) => el.value === value);
      const mainCx = classNames('smart-select', { dropup });
      const buttonCx = classNames('btn-group', 'smart-select__select');

      return (
        <div className={mainCx}>
          <div className={buttonCx} ref="dropdown">
            {this.renderValue(selected[0], disabled)}
            <ul className="dropdown-menu" ref="menu">
              {this.renderOptions(options, onChange)}
            </ul>
          </div>
          <span className="smart-select__status">
            <div className="smart-select__status__icon-container">
              <RequestStatus status={status} />
            </div>
          </span>
        </div>
      );
    },
  });
};

export default SmartSelectDumb;
