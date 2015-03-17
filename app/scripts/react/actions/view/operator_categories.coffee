window.OperatorCategoriesViewActions =

  loadCategories: ({url, data}) ->
    CategoriesResource.index {url, data}
      .then OperatorCategoriesServerActions.receiveCategories

  reorderCategories: (options) ->
    OperatorCategoriesService.reorderCategories options

  reloadCategory: ({categoryId}) ->
    CategoriesResource.get {
      categoryId: categoryId
      success: (category) ->
        OperatorCategoriesServerActions.receiveCategory category
    }

  createCategory: ({name, parentId, success, error}) ->
    CategoriesResource.create {
      data:
        name:      name
        parent_id: parentId
        position:  OperatorCategoriesStore.getCategoryPosition(parent_id: parentId)
      success: (category) ->
        OperatorCategoriesServerActions.createCategory category
        success?(category)
      error: (xhr, status, err) ->
        error?(err || status)
    }

  updateCategory: ({category, success, error}) ->
    CategoriesResource.update {
      categoryId: category.id
      data:
        name:      category.name
        position:  category.position
        parent_id: category.parent_id
      success: (category) ->
        OperatorCategoriesServerActions.updateCategory category
        success?(category)
      error: (xhr, status, err) ->
        error?(err || status)
    }

  deleteCategory: ({category, error}) ->
    CategoriesResource.delete {
      categoryId: category.id
      success: (response) ->
        OperatorCategoriesServerActions.deleteCategory category
        success?(response)
      error: (xhr, status, err) ->
        error?(err || status)
    }