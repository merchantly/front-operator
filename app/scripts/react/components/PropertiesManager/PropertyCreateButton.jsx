import React, { PropTypes, Component } from 'react';

export default class PropertyCreateButton extends Component {
  static propTypes = {
    hasItems: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
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
    const { t } = this.props;

    return this.props.hasItems ? t('properties_manager.add_property_button') : t('properties_manager.create_property_button');
  }
}