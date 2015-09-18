import React, { Component, PropTypes } from 'react';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    fitWindow: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
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
  render() {
    const { children, okClosesModal, title, textButtonCancel, textButtonOk, uuid } = this.props;

    return (
      <div className="modal" id={uuid} role="dialog" tabIndex="-1">
        <div className={this.props.fitWindow && 'modal-wrapper'}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  aria-label={textButtonCancel}
                  className="close"
                  data-dismiss="modal"
                  onClick={this.onClose.bind(this)}
                  type="button"
                >
                  <span aria-hidden={true}>{'\u00d7'}</span>
                </button>
                <h4 className="modal-title">{title}</h4>
              </div>
              <div className="modal-body">
                {children}
              </div>
              <div className="modal-footer">
                { textButtonCancel &&
                  <button
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.onClose.bind(this)}
                    type="button"
                  >
                    {textButtonCancel}
                  </button>
                }
                <button
                  className="btn btn-primary"
                  data-dismiss={okClosesModal ? "modal" : void 0}
                  onClick={this.onOk.bind(this)}
                  type="button"
                >
                  {textButtonOk}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
