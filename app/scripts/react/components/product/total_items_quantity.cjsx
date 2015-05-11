###* @jsx React.DOM ###

window.ProductTotalItemsQuantity = React.createClass

  propTypes:
    product: React.PropTypes.object.isRequired

  render: ->
    quantity     = parseInt(@props.product.total_items_quantity)
    quantityUnit = @props.product.quantity_unit.short

    if quantity > 0
      content = "#{quantity} #{quantityUnit}"
    else
      content = 'Нет в наличии'

    return <span className="adm-categories-goods-total-quantity"
                 dangerouslySetInnerHTML={{ __html: content }} />