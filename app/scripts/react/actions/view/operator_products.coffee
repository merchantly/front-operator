window.OperatorProductsViewActions =

  loadProducts: ({url, data}) ->
    OperatorProductsService.loadProducts {url, data}

  loadMoreProducts: ({url, data}) ->
    OperatorProductsService.loadMoreProducts {url, data}

  changeProductCategory: (options) ->
    OperatorProductsService.changeProductCategory options