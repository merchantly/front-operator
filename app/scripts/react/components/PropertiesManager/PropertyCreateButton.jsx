import React, { PropTypes } from 'react';

export default class PropertyCreateButton {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }
  render() {
    return (
      <Button
        active={true}
        bsStyle="primary"
        className="btn-rounded btn-sm m-t-xs"
        onClick={this.props.onClick}
      >
        <i className="fa fa-plus" /> Создать характеристику
      </Button>
    );
  }
}