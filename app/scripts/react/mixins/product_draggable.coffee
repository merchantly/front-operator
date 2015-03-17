window.ProductDraggable =

  getInitialState: ->
    isDragged: false

  componentDidMount: ->
    that = @

    if @props.canMove
      $(@getDOMNode()).draggable {
        scope: 'productsToCategories'
        addClasses: false
        appendTo: 'body'
        zIndex: 100
        cursor: 'default'
        cursorAt:
          top: -5
          left: -15
        helper: ->
          if DragStateStore.isMultipleSelected()
            stringComponent = React.renderComponentToString OperatorProducts_ListItemsDrag {
              products: DragStateStore.getSelectedProducts()
            }
          else
            stringComponent = React.renderComponentToString OperatorProducts_ListItemDrag {
              product: that.props.product
            }

          $(stringComponent)
        start: (e) =>
          DragStateDispatcher.handleViewAction {
            type: 'productBecameDraggable'
            product: @props.product
          }
          @setState(isDragged: true)
        stop: (e) ->
          # Небольшой хак для помощи в предотвращении срабатывания клика после drop.
          # В целом правильнее было бы сначала повесить событие drag, потом click,
          # но в Реактовской инфраструктуре это выглядело бы кривовато.
          setTimeout ->
            DragStateDispatcher.handleViewAction {
              type: 'productBecameStatic'
              product: that.props.product
            }
            that.setState(isDragged: false)
          , 0
      }

  componentWillUnmount: ->
    if @props.canMove
      $(@getDOMNode()).draggable 'destroy'