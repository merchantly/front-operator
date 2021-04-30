###* @jsx React.DOM ###

LOADING_STATE = 'loading'
LOADED_STATE  = 'loaded'
ERROR_STATE   = 'error'

window.OperatorCategories = React.createClass

  propTypes:
    productsFilter:           React.PropTypes.object
    productsCanMove:          React.PropTypes.bool
    categoriesUrl:            React.PropTypes.string
    productsUrl:              React.PropTypes.string
    addProductImageUrl:       React.PropTypes.string
    changeProductCategoryUrl: React.PropTypes.string
    perPage:                  React.PropTypes.number
    categoryId:               React.PropTypes.number

  getDefaultProps: ->
    productsCanMove:          true
    perPage:                  60
    categoriesUrl:            ApiRoutes.operator_categories_url()
    productsUrl:              ApiRoutes.operator_products_by_category_url()
    addProductImageUrl:       ApiRoutes.operator_product_images_url()
    changeProductCategoryUrl: ApiRoutes.operator_products_change_category_url()

  getInitialState: ->
    currentState:         LOADING_STATE
    currentCategory:      null
    rootCategory:         null
    # Determines whether or not load products deeper. In first time we open
    # all products with subcategories, which implies truthy value
    includeSubcategories: true

  componentDidMount: ->
    OperatorCategoriesViewActions.loadCategories {
      data: filter: @props.productsFilter
      url: @props.categoriesUrl
    }
      .then @activateLoadedState
      .fail @activateErrorState

    OperatorCategoriesStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    OperatorCategoriesStore.removeChangeListener @_onStoreChange

  render: ->
    switch @state.currentState
      when LOADED_STATE
        <OperatorCategories_Loaded
            parentCategory={ this.state.rootCategory }
            currentCategory={ this.state.currentCategory }
            productsFilter={ this.props.productsFilter }
            productsCanMove={ this.props.productsCanMove }
            productsUrl={ this.props.productsUrl }
            addProductImageUrl={ this.props.addProductImageUrl }
            changeProductCategoryUrl={ this.props.changeProductCategoryUrl }
            includeSubcategories={ this.state.includeSubcategories }
            perPage={ this.props.perPage }
            onCategorySelect={ this.handleCategorySelect } />
      when LOADING_STATE
        <OperatorCategories_Loading />
      when ERROR_STATE
        <OperatorCategories_LoadingError />
      else console.warn 'Unknown currentState of OperatorCategories component', @state.currentState

  activateLoadedState: -> @setState(currentState: LOADED_STATE)
  activateErrorState:  -> @setState(currentState: ERROR_STATE)

  handleCategorySelect: ({category, includeSubcategories}) ->
    @setState
      currentCategory: category
      includeSubcategories: includeSubcategories

    Aviator.navigate '', queryParams: { category_id: category.id }
    #TODO: store currentCategory in individual store
    DragStateDispatcher.handleViewAction(type: 'currentCategoryChanged')

  _onStoreChange: ->
    rootCategory = OperatorCategoriesStore.getRootCategory()

    if OperatorCategoriesStore.getCategoryById @props.categoryId
      currentCategory = OperatorCategoriesStore.getCategoryById @props.categoryId
    else
      if OperatorCategoriesStore.isCategoryExists @state.currentCategory
        currentCategory = @state.currentCategory
      else if @state.currentCategory && @state.currentCategory.parentId
        currentCategory = OperatorCategoriesStore.getCategoryById @state.currentCategory.parentId
      else
        currentCategory = rootCategory

    @setState
      currentCategory: currentCategory
      rootCategory:    rootCategory
