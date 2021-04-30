window.OperatorCategoriesService =

  reorderCategories: ({categoryId, insertIdx}) ->
    #TODO: refactor
    newPositions = OperatorCategoriesStore.getReorderedPositions categoryId, insertIdx

    if newPositions.length
      OperatorCategoriesServerActions.reorderCategories newPositions
      @updateCategories newPositions, (err, response) ->
        console.error(err) if err # todo

  updateCategories: (data, callback) ->
    #TODO: refactor
    #TODO: Очень грубая замена. Надо бы делать хотя бы async.parallel
    done = _.after data.length, ->
      callback()
    that = @
    _.each data, (i) ->
      CategoriesResource.update {
        categoryId: i.id
        data:
          name:      i.name
          position:  i.position
          parent_id: i.parentId
        success: done
      }
