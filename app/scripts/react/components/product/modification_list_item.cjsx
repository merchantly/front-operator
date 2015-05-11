classnames = require 'classnames'

window.ProductModificationListItem = React.createClass

  propTypes:
    modification: React.PropTypes.object.isRequired

  render: ->
    title        = @props.modification.title
    count        = @props.modification.count
    quantityUnit = @props.modification.quantity_unit.short
    itemClasses  = classnames 'adm-categories-goods-modifications-item', {
      '__not-synced': !@isSynced()
    }

    return <li className={ itemClasses }>
              { title } - { count }{ quantityUnit }
            </li>

  isSynced: -> @props.modification.is_stock_synced is true