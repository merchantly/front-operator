import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Modal extends Component {
  static propTypes = {
    cancelClosesModal: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    fitWindow: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onOk: PropTypes.func,
    okClosesModal: PropTypes.bool,
    textButtonCancel: PropTypes.string,
    textButtonOk: PropTypes.string,
    title: PropTypes.string,
    uuid: PropTypes.string.isRequired,
  }
  static defaultProps = {
    textButtonCancel: 'Закрыть',
    textButtonOk: 'ОК',
    title: '',
  }
  onClose() {
    this.props.onClose();
  }
  onOk() {
    this.props.onOk();
  }
  renderFooter() {
    const { textButtonCancel, textButtonOk, okClosesModal } = this.props;

    if (textButtonCancel || textButtonOk) {
      return (
        <div className="modal-footer">
          {textButtonCancel
           && <Button onClick={this.onClose.bind(this)}>
                {textButtonCancel}
              </Button>
          }
          {textButtonOk
           && <Button
                bsStyle="primary"
                data-dismiss={okClosesModal ? "modal" : void 0}
                onClick={this.onOk.bind(this)}
              >
                {textButtonOk}
              </Button>
          }
        </div>
      );
    }
  }
  render() {
    const { cancelClosesModal, headerButtons, children, title, uuid } = this.props;

    return (
      <div className="modal" id={uuid} role="dialog" tabIndex="-1">
        <div className={this.props.fitWindow && 'modal-wrapper'}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  className="close"
                  data-dismiss={cancelClosesModal ? "modal" : void 0}
                  onClick={this.onClose.bind(this)}
                  type="button"
                >
                  <span aria-hidden={true}>{'\u00d7'}</span>
                </button>
                <span className="modal-extra-buttons">
                  {headerButtons}
                </span>
                <h4 className="modal-title">{title}</h4>
              </div>
              <div className="modal-body">
                {children}
              </div>
              {this.renderFooter.call(this)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
