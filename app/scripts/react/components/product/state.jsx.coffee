###* @jsx React.DOM ###


window.ProductState = React.createClass

  propTypes:
    product: React.PropTypes.object.isRequired

  render: ->
    return null unless @props.product.operator_state? && @props.product.operator_state.visible

    source = label: true
    source[@props.product.operator_state.css_class] = true

    classes = React.addons.classSet source

    `<span className={classes}>{this.props.product.operator_state.title}</span>`
