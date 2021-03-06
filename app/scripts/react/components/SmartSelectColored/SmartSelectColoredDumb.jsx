/*global $ */
import React, { PropTypes } from 'react';
import RequestStatus from '../common/RequestStatus';
import classNames from 'classnames';
import { default as Parent } from './index.jsx';

const SmartSelectColoredDumb = function SmartSelectColoredDumb(props) {
  SmartSelectColoredDumb.propTypes = {
    colored: Parent.propTypes.colored,
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
      const dropdown = this.getDropdownEl();
      if (!dropdown) {
        return;
      }

      $(dropdown).on('shown.bs.dropdown', this.props.onOpen);
      $(dropdown).on('hidden.bs.dropdown', this.props.onClose);
    },

    componentWillUnmount() {
      const dropdown = this.getDropdownEl();
      if (!dropdown) {
        return;
      }

      $(dropdown).off();
    },

    getDropdownEl() {
      const dropdown = this.refs.dropdown.getDOMNode();
      return (dropdown instanceof HTMLElement)
        ? dropdown
        : false;
    },

    renderOptions(options, onChange) {
      return options.map(({ color_rgb, title, value }) =>
        <li
          key={value}
          onClick={() => onChange(value)}
          ref={`option-${title}`}
        >
          <a href="#">
            { this.props.colored &&
            <span
              className="smart-select__select__option__rgb-box"
              ref={`rgb-box-${title}`}
              style={{ backgroundColor: color_rgb }}
            />
            }
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
          ref="button"
          style={ this.props.colored ? { backgroundColor: color_rgb } : {}}
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
      const mainClasses = classNames('smart-select', { dropup });
      const buttonClasses = classNames('btn-group', 'smart-select__select');

      return (
        <div className={mainClasses}>
          <div className={buttonClasses} ref="dropdown">
            {this.renderValue(selected[0], disabled)}
            <ul className="dropdown-menu" ref="menu">
              {this.renderOptions(options, onChange)}
            </ul>
          </div>
          {false &&
            <span className="smart-select__status">
              <div className="smart-select__status__icon-container">
                <RequestStatus status={status} />
              </div>
            </span>
          }
        </div>
      );
    },
  });
};

export default SmartSelectColoredDumb;
