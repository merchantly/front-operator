import React, { PropTypes } from 'react';
import RequestStatus from '../common/RequestStatus';
import classNames from 'classnames';
import { default as Parent } from './index';

export default function SmartCheckboxDumb(props) {
  SmartCheckboxDumb.propTypes = {
    disabled: PropTypes.bool.isRequired,
    hint: Parent.propTypes.hint,
    onClick: PropTypes.func.isRequired,
    status: PropTypes.string,
    title: Parent.propTypes.title,
    value: Parent.propTypes.value,
  };

  return ({
    props,

    render() {
      const { disabled, hint, onClick, status, title, value } = this.props;
      const cx = classNames({
        'switcher__box': true,
        'switcher__box--checked': value,
        'switcher__box--disabled': disabled,
      });

      return (
        <div className="form-group no-margins">
          <div className="switcher m-r-xs">
            <label onClick={onClick}>
              <span className={cx}>
                <span className="switcher__knob">
                  <div className="switcher__knob__icon-container">
                    <span className="switcher__knob__icon">
                      <RequestStatus status={status} />
                    </span>
                  </div>
                </span>
              </span>
            </label>
          </div>
          <label htmlFor="vendor_is_published">
            {title}
          </label>
          { 
            hint &&
            <p className="help-block">
              {hint}
            </p>
          }
        </div>
      );
    },
  });
}
