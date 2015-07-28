import React, { PropTypes } from 'react';

export default class PropertyCreateButton {
  static propTypes = {
    hasItems: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }
  render() {
    return (
      <Button
        active={true}
        bsStyle="primary"
        disabled={this.props.disabled}
        className="btn-rounded btn-sm m-t-xs"
        onClick={this.props.onClick}
      >
        <i className="fa fa-plus" /> {this.getTitle.call(this)}
      </Button>
    );
  }
  getTitle() {
    return this.props.hasItems ? 'Добавить характеристику' : 'Создать характеристику';
  }
}