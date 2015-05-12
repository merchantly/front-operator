classnames = require 'classnames'

SELECTED_STATE   = 'selected'
UNSELECTED_STATE = 'unselected'

window.OperatorProducts_ListItem = React.createClass
  mixins: [ProductDraggable]

  propTypes:
    product:            React.PropTypes.object.isRequired
    categoryId:         React.PropTypes.number.isRequired
    addProductImageUrl: React.PropTypes.string
    canMove:            React.PropTypes.bool

  getInitialState: ->
    currentState: UNSELECTED_STATE
    product: @props.product

  componentWillReceiveProps: (nextProps) ->
    @setState(product: nextProps.product)

  render: ->
    productClasses = classnames 'adm-categories-goods-item', {
      '__selected': @isSelectedState()
    }

    return <tr className={ productClasses }
                data-category-id={ this.props.categoryId }
                data-product-id={ this.state.product.id }
                onClick={ this.handleClick }
                onDrop={ this.handleDrop }>
              <td className="adm-categories-goods-cover"
                  data-title="Товар">
                <ProductThumb product={ this.state.product } />
              </td>
              <td className="adm-categories-goods-content">
                <span>{ this.state.product.title }</span>
                <ProductModificationList modifications={ this.state.product.items } />
              </td>
              <td className="adm-categories-goods-price"
                  data-title="Сумма">
                <Money money={ this.state.product.price } />
                <ProductTotalItemsQuantity product={ this.state.product } />
              </td>
              <td className="adm-categories-goods-status"
                  data-title="Статус">
                <ProductState product={ this.state.product } />
              </td>
            </tr>

  isSelectedState: -> @state.currentState is SELECTED_STATE

  activateSelectedState:   -> @setState(currentState: SELECTED_STATE)
  activateUnselectedState: -> @setState(currentState: UNSELECTED_STATE)

  toggleSelectedState: ->
    if @isSelectedState()
      @activateUnselectedState()
      DragStateDispatcher.handleViewAction {
        type: 'productBecameUnselected'
        product: @state.product
      }
    else
      @activateSelectedState()
      DragStateDispatcher.handleViewAction {
        type: 'productBecameSelected'
        product: @state.product
      }

  _setPreviewImage: (files) ->
    #FIXME: We will use first image in files list by default
    #       Server can set another main image, if we upload more than one image per time
    newProduct      = _.clone @state.product
    previewImage    = files[0]
    previewImageSrc = window.URL.createObjectURL previewImage

    newProduct.image ?= {}
    newProduct.image.url = previewImageSrc

    @setState(product: newProduct)

  handleDrop: (e) ->
    files = e.dataTransfer.files

    @_setPreviewImage files

    ProductImagesViewActions.addProductImages
      url: @props.addProductImageUrl
      files: files
      productId: @state.product.id

    e.preventDefault()

  handleClick: (e) ->
    if EventHelpers.isAnyServiceKey(e)
      @toggleSelectedState()
    else
      baseUrl = @props.product.edit_path
      backUrl = encodeURIComponent window.location.href

      window.location = baseUrl + '?backurl=' + backUrl
    # window.location = Routes.edit_operator_product_url @props.product.id
    # unless @state.isDragged
    #   ModalController.show Routes.edit_operator_product_url @props.product.id
