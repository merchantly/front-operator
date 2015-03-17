#TODO: Refactor

window.ProductsResource =

  index: ({data, success, error}) ->
    error ||= KioskOperatorApp.error_alert
    data.per_page ||= 1000
    Requester.request
      dataType: 'json'
      url:      ApiRoutes.operator_products_by_category_url()
      method:   'get'
      data: data
      error: (xhr, status, err) ->
        error err || status
      success: (data) ->
        # TODO Пейджирование
        success data.products

  get: ({productId, success, error}) ->
    Requester.request
      url: ApiRoutes.operator_product_url productId
      success: (product) ->
        success?(product)
      error: (xhr, status, err) ->
        error?(err || status)

  publish: ({id, success, error}) ->
    $.ajax
      dataType: 'json'
      method:   'post'
      url:      ApiRoutes.operator_product_publicate_url id
      error: (xhr, status, err) ->
        if error then error err || status
      success: (data) ->
        if success then success data

  unpublish: ({id, success, error}) ->
    $.ajax
      dataType: 'json'
      method:   'delete'
      url:      ApiRoutes.operator_product_publicate_url id
      error: (xhr, status, err) ->
        if error then error err || status
      success: (data) ->
        if success then success data

  update: ({id, data, success, error}) ->
    Requester.request
      dataType: 'json'
      method:   'put'
      url:      ApiRoutes.operator_product_url id
      data:     data

      error: (xhr, status, err) -> error err || status
      success: success