###* @jsx React.DOM ###

window.OperatorCategories_Loaded = React.createClass

  propTypes:
    parentCategory:           React.PropTypes.object.isRequired
    currentCategory:          React.PropTypes.object.isRequired
    productsFilter:           React.PropTypes.object
    productsCanMove:          React.PropTypes.bool
    productsUrl:              React.PropTypes.string
    addProductImageUrl:       React.PropTypes.string
    changeProductCategoryUrl: React.PropTypes.string
    includeSubcategories:     React.PropTypes.bool.isRequired
    perPage:                  React.PropTypes.number.isRequired
    onCategorySelect:         React.PropTypes.func.isRequired

  componentDidMount: ->
    if @props.productsCanMove
      $(@getDOMNode()).droppable
        scope: 'productsToCategories'
        addClasses: false
        tolerance: 'pointer'
        over: -> DragStateDispatcher.handleViewAction(type: 'dragInsideOfLayout')
        out:  -> DragStateDispatcher.handleViewAction(type: 'dragOutsideOfLayout')

  componentWillUnmount: ->
    if @props.productsCanMove
      $(@getDOMNode()).droppable 'destroy'

  render: ->
    currentCategory      = @props.currentCategory
    currentCategoryLevel = OperatorCategoriesStore.getCategoryLevel currentCategory

    if currentCategoryLevel == 0
      categoriesContent = `<OperatorCategories_OneCategory
                               parentCategory={ this.props.parentCategory }
                               currentCategory={ currentCategory }
                               productsFilter={ this.props.productsFilter }
                               changeProductCategoryUrl={ this.props.changeProductCategoryUrl }
                               includeSubcategories={ this.props.includeSubcategories }
                               onCategorySelect={ this.props.onCategorySelect } />`
    else
      categoriesContent = `<OperatorCategories_TwoCategories
                               parentCategory={ this.props.parentCategory }
                               currentCategory={ currentCategory }
                               productsFilter={ this.props.productsFilter }
                               changeProductCategoryUrl={ this.props.changeProductCategoryUrl }
                               includeSubcategories={ this.props.includeSubcategories }
                               onCategorySelect={ this.props.onCategorySelect } />`

    return `<div className="adm-categories-grid">
              { categoriesContent }
              <div className="adm-categories-grid-col __wide">
                <OperatorProducts
                    categoryId={ this.props.currentCategory.id }
                    productsFilter={ this.props.productsFilter }
                    productsUrl={ this.props.productsUrl }
                    addProductImageUrl={ this.props.addProductImageUrl }
                    productsCanMove={ this.props.productsCanMove }
                    perPage={ this.props.perPage }
                    includeSubcategories={ this.props.includeSubcategories } />
              </div>
            </div>`