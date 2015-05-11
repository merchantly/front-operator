###* @jsx React.DOM ###

window.OperatorProducts_ListItemsDrag = React.createClass

  propTypes:
    products: React.PropTypes.array.isRequired

  render: ->
    products = @props.products.map (product) ->
      <tr>
        <td className="adm-categories-goods-cover"
            data-title="Товар">
          <ProductThumb product={ product } />
        </td>
        <td className="adm-categories-goods-content">
          { product.title }
        </td>
      </tr>

    return <span className="adm-categories-goods-draghelper">
              <table>
                <tbody>
                  { products }
                </tbody>
              </table>
              <hr />
              <i>Перетащите товары в категорию</i>
            </span>

  imageUrl: ->
    AppHelpers.productImageUrl @props.product