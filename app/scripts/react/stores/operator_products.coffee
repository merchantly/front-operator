BaseStore = require './_base'

_products = {}

window.OperatorProductsStore = _.extend new BaseStore(), {

  isProductExists: (categoryId, productId) ->
    products = _products[categoryId] ? []

    for product in products when product.id == productId
      return true

    false

  replaceProducts: (categoryId, products) ->
    _products[categoryId] = products

  pushProducts: (categoryId, products) ->
    _products[categoryId] ||= []
    clonedProducts = _products[categoryId][..]

    for product in products
      unless @isProductExists categoryId, product
        clonedProducts.push product

    _products[categoryId] = clonedProducts

  updateProduct: (categoryId, data) ->
    products = @getProducts categoryId

    for product in products when product.id == data.id
      _.extend product, data
      break

    _products[categoryId] = products

  moveProduct: ({oldCategoryId, newCategoryId, product}) ->
    @removeProduct oldCategoryId, product.id
    @pushProducts newCategoryId, [product]

  removeProduct: (categoryId, productId) ->
    return unless @isProductExists(categoryId, productId)

    clonedProducts = _products[categoryId][..]

    for clonedProduct, i in clonedProducts when clonedProduct.id == productId
      clonedProducts.splice i, 1
      break

    _products[categoryId] = clonedProducts

  getProducts: (categoryId) ->
    _products[categoryId] ? []

}

OperatorProductsStore.dispatchToken = OperatorProductsDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'productsLoaded'
      #TODO: pushProducts instead of replaceProducts
      OperatorProductsStore.replaceProducts action.categoryId, action.products
      OperatorProductsStore.emitChange()
    when 'moreProductsLoaded'
      OperatorProductsStore.pushProducts action.categoryId, action.products
      OperatorProductsStore.emitChange()
    when 'productMoved'
      OperatorProductsStore.moveProduct
        product:       action.product
        newCategoryId: action.newCategoryId
        oldCategoryId: action.oldCategoryId
      OperatorProductsStore.emitChange()
    when 'productUpdated'
      OperatorProductsStore.updateProduct action.categoryId, action.product
      OperatorProductsStore.emitChange()