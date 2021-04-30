classnames = require 'classnames'

#TODO: i18n
TITLE = 'Без категории'

window.OperatorCategories_ListItemWithoutCategory = React.createClass

  propTypes:
    category:         React.PropTypes.object.isRequired
    isActive:         React.PropTypes.bool.isRequired
    onCategorySelect: React.PropTypes.func.isRequired

  render: ->
    totalCount           = @props.category.currentDeepProductsCount
    withoutCategoryCount = @props.category.currentProductsCount
    itemClasses = classnames 'adm-categories-item', {
      '__muted': true
      'selected': @props.isActive
    }

    if withoutCategoryCount != 0 && totalCount != withoutCategoryCount
      return <div className={ itemClasses }
                   onClick={ this.handleClick }>
              <span className="adm-categories-item-name">
                { TITLE }
              </span>
              <span className="adm-categories-item-counter">
                { withoutCategoryCount }
              </span>
            </div>
    else
      return null

  handleClick: ->
    @props.onCategorySelect
      category: @props.category
      includeSubcategories: false
