import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as constants from './constants';

export default function RequestStatus(props) {
  RequestStatus.displayName = 'RequestStatus';
  RequestStatus.propTypes = {
    className: PropTypes.string,
    status: PropTypes.oneOf(
      Object.keys(constants).map((c) => constants[c])
    ),
  };

  return ({
    props,

    renderIcon(status) {
      const assocMap = {
        [constants.REQUEST_OK]: 'fa-check-circle',
        [constants.REQUEST_ERROR]: 'fa-exclamation-circle',
        [constants.REQUEST_LOADING]: 'fa-spinner fa-pulse',
      };

      return assocMap[status]
        ? <i className={classNames('fa', 'fa-lg', assocMap[status])} />
        : <div />;
    },

    render() {
      return (
        <span className="dropdown-update-status__status">
          <div className="dropdown-update-status__status__icon-container">
            {this.renderIcon(this.props.status)}
          </div>
        </span>
      );
    },
  });
}
