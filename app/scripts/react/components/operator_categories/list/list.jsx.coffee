###* @jsx React.DOM ###

DRAG_DELAY  = 100
DRAG_REVERT = 100

window.OperatorCategories_List = React.createClass

  propTypes:
    parentCategory:           React.PropTypes.object
    currentCategory:          React.PropTypes.object
    changeProductCategoryUrl: React.PropTypes.string
    includeSubcategories:     React.PropTypes.bool
    onCategorySelect:         React.PropTypes.func.isRequired

  getInitialState: ->
    parentCategory:   @props.parentCategory
    categoriesToShow: OperatorCategoriesStore.getSortedCategoriesByParent @props.parentCategory

  componentDidMount: ->
    OperatorCategoriesStore.addChangeListener @_onStoreChange

    $(@refs.list.getDOMNode()).sortable
      scope: 'categoriesReorder'
      placeholder: 'adm-categories-item __dropzone'
      forcePlaceholderSize: true
      revert: DRAG_REVERT
      delay: DRAG_DELAY
      stop: @handleDrop

  componentWillReceiveProps: (nextProps) ->
    @setState
      parentCategory:   nextProps.parentCategory
      categoriesToShow: OperatorCategoriesStore.getSortedCategoriesByParent nextProps.parentCategory

  componentWillUnmount: ->
    OperatorCategoriesStore.removeChangeListener @_onStoreChange

  render: ->
    that = @
    categories = @state.categoriesToShow.map (category) ->
      `<OperatorCategories_ListItemManager
           category={ category }
           changeProductCategoryUrl={ that.props.changeProductCategoryUrl }
           isActive={ that._isCategoryActive(category) }
           onCategorySelect={ that.props.onCategorySelect }
           key={ category.id } />`

    return `<div className="adm-categories-list">

              <OperatorCategories_ListItemWithSubcategories
                  category={ this.props.parentCategory }
                  changeProductCategoryUrl={ this.props.changeProductCategoryUrl }
                  isActive={ this.props.currentCategory.id == this.props.parentCategory.id &&
                             this.props.includeSubcategories == true }
                  onCategorySelect={ this.props.onCategorySelect } />

              <span ref="list">{ categories }</span>

              <OperatorCategories_ListItemWithoutCategory
                  category={ this.props.parentCategory }
                  isActive={ this.props.currentCategory.id == this.props.parentCategory.id &&
                             this.props.includeSubcategories == false }
                  onCategorySelect={ this.props.onCategorySelect } />

              <OperatorCategories_CreateForm parentCategory={ this.props.parentCategory } />
            </div>`

  _isCategoryActive: (category) ->
    currentCategory = @props.currentCategory

    if currentCategory and not (@state.parentCategory and @state.parentCategory.id == currentCategory.id)
      (category.id == currentCategory.id) or (category.id == currentCategory.parent_id)
    else
      false

  handleDrop: (evt, ui) ->
    # Считываем нужные параметры перед завершением drag&drop, затем отменяем его.
    # Если не отменить, ui.sortable сам меняет порядок элементов в DOM,
    # что вступает в конфликт с рендерингом React, и всё ломается.
    srcId = parseInt ui.item.attr('data-objectid')
    insertIdx = ui.item.index()
    $(@refs.list.getDOMNode()).sortable 'cancel'

    OperatorCategoriesViewActions.reorderCategories {
      categoryId: srcId
      insertIdx:  insertIdx
    }

  handleTotalCountClick: (e) ->
    e.preventDefault()
    @props.onCategorySelect @props.parentCategory

  _onStoreChange: ->
    @setState
      categoriesToShow: OperatorCategoriesStore.getSortedCategoriesByParent @state.parentCategory