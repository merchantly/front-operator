ApiRoutes =
  operator_product_image_delete_url:  (id) -> gon.operator_api_url + '/v1/products/images/' + id
  operator_product_images_rotate_url: (id) -> gon.operator_api_url + '/v1/product_images/' + id + '/rotate'
  operator_product_images_url:             -> gon.operator_api_url + '/v1/product_images'

  operator_categories_url:      -> gon.operator_api_url + '/v1/categories'
  operator_category_url:   (id) -> gon.operator_api_url + '/v1/categories/' + id

  operator_product_url:             (id) -> gon.operator_api_url + '/v1/products/' + id
  operator_product_publicate_url:   (id) -> gon.operator_api_url + '/v1/products/' + id + '/publication'
  operator_products_by_category_url:     -> gon.operator_api_url + '/v1/products'
  operator_products_change_category_url: -> gon.operator_api_url + '/v1/products/:id/change_category'

  operatorCategories: -> gon.operator_api_url + '/v1/categories'
  operatorCategoriesID: (categoryID) -> gon.operator_api_url + '/v1/categories/' + categoryID

module.exports = ApiRoutes