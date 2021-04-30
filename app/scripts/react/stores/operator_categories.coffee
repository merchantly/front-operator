BaseStore = require './_base'

_categories = []

_getNewPositions = (category, insertIndex) ->
  # Хитрые разборки с целью несколько минимизировать объём обновлений
  # Оптимальный алгоритм уж делать не стал - только минимальная оптимизация
  # в частных случаях
  oldCategoriesParent    = OperatorCategoriesStore.getCategoryById category.parentId
  oldCategoriesPositions = OperatorCategoriesStore.getSortedCategoriesByParent oldCategoriesParent

  originalIndex = _.findIndex oldCategoriesPositions, (i) -> i.id == category.id

  # Нужно ли менять позицию вообще
  return [] if insertIndex == originalIndex

  oldCategoriesPositions = _.reject oldCategoriesPositions, (i) -> i.id == category.id
  previousSibling = oldCategoriesPositions[insertIndex - 1] unless insertIndex < 1
  nextSibling     = oldCategoriesPositions[insertIndex] unless insertIndex > oldCategoriesPositions.length - 1

  # If we insert category at the end of list
  unless nextSibling
    return [{
      id: category.id
      position: previousSibling.position + 1
    }]

  # If we insert category at the start of list, then set mock data
  unless previousSibling
    previousSibling = {
      position: -1
      id: null
    }

  # Если есть "место" в номерах позиций - просто используем его
  positionDiff = nextSibling.position - previousSibling.position
  if positionDiff > 1
    return [{
      id:       category.id
      position: previousSibling.position + 1
    }]

  # Если оптимизации не сработали, просто сдвигаем хвост вниз
  slicePosition = previousSibling.position + 1
  newPositions = [{
    id: category.id
    position: slicePosition
    name: category.name
  }]
  oldTail = oldCategoriesPositions[insertIndex..]

  for catToShift in oldTail
    minPosition     = slicePosition + 1
    currentPosition = catToShift.position
    # Проверяем: возможно, не надо двигать все элементы
    if currentPosition < minPosition
      currentPosition = minPosition
      newPositions.push {
        id:       catToShift.id
        position: currentPosition
        name:     catToShift.name
      }
      slicePosition = currentPosition + 1

  return newPositions

window.OperatorCategoriesStore = _.extend new BaseStore(), {

  isCategoryExists: (category) ->
    return false unless category

    for _category in _categories when _category.id == category.id
      return true

    false

  pushCategories: (categories) ->
    clonedCategories = _categories[..]

    for category in categories when !@isCategoryExists category
      clonedCategories.push category

    _categories = clonedCategories

  updateCategory: (data) ->
    for _category in _categories when _category.id == data.id
      _.extend _category, data
      break

  updatePositions: (newPositions) ->
    reorderedCategories = _categories[..]

    for category in reorderedCategories
      for newPosition in newPositions when category.id == newPosition.id
        category.position = newPosition.position

    _categories = reorderedCategories

  deleteCategory: (category) ->
    clonedCategories = _categories[..]

    for clonedCategory, i in clonedCategories when clonedCategory.id == category.id
      clonedCategories.splice i, 1
      break

    _categories = clonedCategories

  getCategories: -> _categories

  getRootCategory: ->
    for _category in _categories when _category.parentId is null
      return _category

  getCategoryLevel: (category) ->
    if category.parentId
      1 + @getCategoryLevel( @getCategoryById(category.parentId) )
    else
      0

  getCategoryPosition: (category) ->
    siblings = _.filter _categories, (i) -> i.parentId == category.parentId

    if siblings.length
      lastSibling = _.max siblings, (i) -> i.position
      lastPosition = lastSibling.position
    else
      lastPosition = -1

    lastPosition + 1

  getReorderedPositions: (categoryId, insertIdx) ->
    category = @getCategoryById categoryId

    _getNewPositions category, insertIdx

  getCategoryById: (categoryId) ->
    for _category in _categories when _category.id == categoryId
      return _category

  getSortedCategoriesByParent: (parentCategory) ->
    parentId = if parentCategory then parentCategory.id else null

    _.filter(_categories, (i) -> i.parentId == parentId)
      .sort((a, b) -> a.position - b.position)

}

OperatorCategoriesStore.dispatchToken = OperatorCategoriesDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'categoriesLoaded'
      OperatorCategoriesStore.pushCategories action.categories
      OperatorCategoriesStore.emitChange()
    when 'categoriesReordered'
      OperatorCategoriesStore.updatePositions action.newPositions
      OperatorCategoriesStore.emitChange()
    when 'categoryLoaded'
      if OperatorCategoriesStore.isCategoryExists action.category
        OperatorCategoriesStore.updateCategory action.category
      else
        OperatorCategoriesStore.pushCategories [action.category]

      OperatorCategoriesStore.emitChange()
    when 'categoryCreated'
      OperatorCategoriesStore.pushCategories [action.category]
      OperatorCategoriesStore.emitChange()
    when 'categoryUpdated'
      OperatorCategoriesStore.updateCategory action.category
      OperatorCategoriesStore.emitChange()
    when 'categoryDeleted'
      OperatorCategoriesStore.deleteCategory action.category
      OperatorCategoriesStore.emitChange()
