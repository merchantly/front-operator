import React, { PropTypes } from 'react';
import Select from 'react-select';
import RequestStatus from './RequestStatus';
import * as constants from './constants';
import { default as Parent } from './index.jsx';

const DropdownUpdateStatusDumb = function DropdownUpdateStatusDumb(props) {
  DropdownUpdateStatusDumb.propTypes = {
    errorMsg: PropTypes.string,
    fieldName: Parent.propTypes.fieldName,
    onChange: PropTypes.func,
    options: Parent.propTypes.options,
    status: PropTypes.string,
    value: Parent.propTypes.value,
  };

  return ({
    props,

    renderOption({ color_rgb, title, value }) {
      return (
        <div>
          <span
            className="dropdown-update-status__select__option__rgb-box"
            style={{ backgroundColor: color_rgb }}
          />
          {title}
        </div>
      );
    },

    render() {
      const { errorMsg, fieldName, onChange, options, status, value } = this.props;

      return (
        <div className="dropdown-update-status">
          <Select
            className="dropdown-update-status__select"
            clearable={false}
            disabled={status === constants.REQUEST_LOADING}
            name={fieldName}
            onChange={onChange}
            options={options}
            optionRenderer={this.renderOption}
            valueRenderer={this.renderOption}
            value={value}
          />
          <RequestStatus status={status} />
          <div className="dropdown-update-status__error-container">
            { errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div> }
          </div>
        </div>
      );
    },
  });
};

export default DropdownUpdateStatusDumb;
