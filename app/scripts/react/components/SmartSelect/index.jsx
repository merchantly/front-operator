import React from 'react';
import SmartSelectColored from '../SmartSelectColored';

//proxy component for uncolored version of SmartSelectColored
export default function SmartSelect(props) {
  SmartSelect.propTypes = SmartSelectColored.propTypes;

  return ({
    props,

    render() {
      return (
        <SmartSelectColored {...this.props} colored={false} />
      );
    },
  });
}
