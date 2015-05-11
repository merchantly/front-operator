classnames = require 'classnames'
{ PropTypes } = React

SHOW_STATE    = 'show'
ERROR_STATE   = 'error'
PROCESS_STATE = 'process'

window.StatusToggle = React.createClass

  propTypes:
    titleOn:      PropTypes.string.isRequired
    titleOff:     PropTypes.string.isRequired
    url:          PropTypes.string.isRequired
    method:       PropTypes.string.isRequired
    fieldName:    PropTypes.string.isRequired
    currentValue: PropTypes.bool.isRequired
    disabled:     PropTypes.bool

  getDefaultProps: ->
    disabled: false

  getInitialState: ->
    currentState: SHOW_STATE
    checked: @props.currentValue

  render: ->
    statusClasses = classnames 'toggle__block', {
      'checked': @state.checked
    }

    return <label className={ statusClasses }>
              <div className="toggle__block-label-checked pull-left">
                { this.props.titleOn }
              </div>
              <div className="toggle__block-box pull-left">
                <input type="checkbox"
                       checked={ this.state.checked }
                       disabled={ this.props.disabled }
                       className="toggle__block-checkbox"
                       onChange={ this.handleInputChange } />
                <div className="toggle__block-switch" />
                <div className="toggle__block-track" />
              </div>
              <div className="toggle__block-label-unchecked pull-left">
                { this.props.titleOff }
              </div>
              <div className="clearfix" />
            </label>

  isProcessState: -> @state.currentState is PROCESS_STATE

  handleInputChange: (e) ->
    return e.preventDefault() if @isProcessState() || @props.disabled

    checked = e.target.checked
    data = {}
    data[@props.fieldName] = checked

    Requester.request
      url: @props.url
      data: data
      method: @props.method
      success: => @setState(checked: checked)
      error: (data) =>
        alert data.responseJSON?.error || 'Ошибка'
        @setState(checked: !checked)