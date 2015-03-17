window.CategoryDroppable =

  componentDidMount: ->
    that = @

    $(@getDOMNode()).droppable {
      scope: 'productsToCategories'
      addClasses: false
      tolerance: 'pointer'
      drop: @handleProductDrop
      accept: _.throttle (productNode) ->
        category_id = parseInt productNode.attr 'data-category-id'
        return category_id != that.props.category.id
    }

  handleProductDrop: (e, ui) ->
    if DragStateStore.isMultipleSelected()
      OperatorProductsService.changeProductsCategory
        url: @props.changeProductCategoryUrl
        products: DragStateStore.getSelectedProducts()
        newCategoryId: @props.category.id
        oldCategoryId: parseInt ui.draggable.attr 'data-category-id'
    else
      OperatorProductsService.changeProductsCategory
        url: @props.changeProductCategoryUrl
        products: DragStateStore.getDraggedProducts()
        newCategoryId: @props.category.id
        oldCategoryId: parseInt ui.draggable.attr 'data-category-id'

    DragStateDispatcher.handleViewAction {
      type: 'productsMoved'
    }

  componentWillUnmount: ->
    $(@getDOMNode()).droppable 'destroy'