window.OperatorProductsService =

  loadProducts: ({url, data}) ->
    Requester.request {
      url: url
      data:
        category_id:           data.categoryId
        filter:                data.filter
        include_subcategories: data.includeSubcategories
        page:                  1
        per_page:              data.per_page
    }
      .then (response) ->
        OperatorProductsServerActions.receiveProducts data.categoryId, response.items
        response

  loadMoreProducts: ({url, data}) ->
    Requester.request {
      url: url
      data:
        category_id:           data.categoryId
        filter:                data.filter
        include_subcategories: data.includeSubcategories
        page:                  data.page
        per_page:              data.per_page
    }
      .then (response) ->
        OperatorProductsServerActions.receiveMoreProducts data.categoryId, response.items
        response

  changeProductCategory: ({url, productId, newCategoryId, oldCategoryId, success}) ->
    url = url.replace /(:id)/g, productId

    Requester.request
      url: url
      method: 'PUT'
      data:
        new_category_id: newCategoryId
        old_category_id: oldCategoryId
      success: (product) ->
        success?()
        OperatorProductsServerActions.moveProduct
          product:       product
          newCategoryId: newCategoryId
          oldCategoryId: oldCategoryId

  changeProductsCategory: ({url, products, newCategoryId, oldCategoryId}) ->
    completedRequests = 0

    for product in products
      @changeProductCategory {
        url: url
        productId: product.id
        newCategoryId: newCategoryId
        oldCategoryId: oldCategoryId
        success: ->
          completedRequests++

          # Reload changed categories when all requests will complete
          if completedRequests == products.length
            OperatorCategoriesViewActions.reloadCategory(categoryId: newCategoryId)
            OperatorCategoriesViewActions.reloadCategory(categoryId: oldCategoryId)
      }
