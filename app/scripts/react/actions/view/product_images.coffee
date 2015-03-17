window.ProductImagesViewActions =

  preloadImage: ({file, productId, productCardId, success, error, beforeSend, complete}) ->
    formData = new FormData()
    formData.append 'image', file
    formData.append 'product_id', productId          if productId?
    formData.append 'product_card_id', productCardId if productCardId?

    Requester.request
      url: ApiRoutes.operator_product_images_url()
      method: 'POST'
      data: formData
      contentType: false
      processData: false
      beforeSend: beforeSend
      success: (data) => success?(data)
      error: (data) => error?(data)
      complete: complete

  addProductImages: ({url, files, productId}) ->
    if files.length
      xhrs = []

      for file in files
        formData = new FormData()
        formData.append 'image', file
        formData.append 'product_id', productId

        #TODO: ProductImagesResource.get
        xhr = Requester.request
          url: url
          method: 'POST'
          data: formData
          contentType: false
          processData: false

        xhrs.push xhr

    $.when.apply($, xhrs).done ->
      ProductsResource.get
        productId: productId
        success: (product) ->
          OperatorProductsServerActions.updateProduct
            product:    product
            categoryId: product.category_id

  rotateImage: (imageId, degree = 90) ->
    Requester.request
      url: ApiRoutes.operator_product_images_rotate_url imageId
      method: 'POST'
      data:
        id:   imageId
        grad: degree