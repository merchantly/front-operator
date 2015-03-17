###* @jsx React.DOM ###

OperatorProducts_AddProductButton = require '../buttons/add_product'

window.OperatorProducts_List = React.createClass

  propTypes:
    categoryId:         React.PropTypes.number.isRequired
    productsCanMove:    React.PropTypes.bool
    addProductImageUrl: React.PropTypes.string

  getInitialState: ->
    @getStateFromStore()

  componentDidMount: ->
    OperatorProductsStore.addChangeListener @_onStoreChange

    $(window).on 'drop dragover', @handleWindowEvents

  componentWillUnmount: ->
    OperatorProductsStore.removeChangeListener @_onStoreChange

    $(window).off 'drop dragover', @handleWindowEvents

  render: ->
    that = @
    products = @state.products.map (product) ->
      `<OperatorProducts_ListItem
            product={ product }
            canMove={ that.props.productsCanMove }
            addProductImageUrl={ that.props.addProductImageUrl }
            categoryId={ that.props.categoryId }
            key={ product.id } />`

    return `<div className="adm-categories-content">
              <OperatorProducts_AddProductButton categoryId={ this.props.categoryId } />
              <table className="adm-categories-goods">
                <tbody>{ products }</tbody>
              </table>
            </div>`

  getStateFromStore: ->
    products: OperatorProductsStore.getProducts @props.categoryId

  handleWindowEvents: (e) ->
    e.preventDefault()

  _onStoreChange: ->
    @setState @getStateFromStore()