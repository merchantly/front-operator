import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { REQUEST_OK, REQUEST_LOADING, REQUEST_ERROR } from '../../constants/requestStatus';

export default function RequestStatus(props) {
  RequestStatus.displayName = 'RequestStatus';
  RequestStatus.propTypes = {
    sizeClass: PropTypes.string,
    status: PropTypes.oneOf([
      REQUEST_OK,
      REQUEST_LOADING,
      REQUEST_ERROR,
    ]),
  };

  return ({
    props,

    render() {
      const assocMap = {
        [REQUEST_OK]: 'fa-check-circle',
        [REQUEST_ERROR]: 'fa-exclamation-circle',
        [REQUEST_LOADING]: 'fa-spinner fa-pulse',
      };

      return assocMap[this.props.status]
        ? <i
            className={classNames('fa', 'fa-lg' || this.props.sizeClass, assocMap[this.props.status])}
            ref="icon"
          />
        : <div />;
    },
  });
}
