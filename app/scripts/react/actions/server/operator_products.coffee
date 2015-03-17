window.OperatorProductsServerActions =

  receiveProducts: (categoryId, products) ->
    OperatorProductsDispatcher.handleServerAction
      type: 'productsLoaded'
      categoryId: categoryId
      products: products

  receiveMoreProducts: (categoryId, products) ->
    OperatorProductsDispatcher.handleServerAction
      type: 'moreProductsLoaded'
      categoryId: categoryId
      products: products

  updateProduct: ({categoryId, product}) ->
    OperatorProductsDispatcher.handleServerAction
      type: 'productUpdated'
      product: product
      categoryId: categoryId

  moveProduct: ({oldCategoryId, newCategoryId, product}) ->
    #TODO: increment newCategoryId counter without additional get request
    OperatorProductsDispatcher.handleServerAction
      type: 'productMoved'
      product: product
      newCategoryId: newCategoryId
      oldCategoryId: oldCategoryId