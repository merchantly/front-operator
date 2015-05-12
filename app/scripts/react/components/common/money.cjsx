window.Money = React.createClass

  propTypes:
    money: React.PropTypes.object
    className: React.PropTypes.string

  getDefaultProps: ->
    className: 'nobr'

  render: ->
    <span className={ this.props.className }
          dangerouslySetInnerHTML={{ __html: this.renderContent() }} />

  renderContent: ->
    if @props.money?
      { cents, currency } = @props.money
      MoneyHelpers.format cents, currency
    else
      '---'