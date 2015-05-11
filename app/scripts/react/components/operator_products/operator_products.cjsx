PureRenderMixin = require 'react/lib/ReactComponentWithPureRenderMixin'

LOADING_MORE_STATE = 'loadingMoreState'
LOADING_STATE      = 'loading'
LOADED_STATE       = 'loaded'
EMPTY_STATE        = 'empty'
ERROR_STATE        = 'error'

window.OperatorProducts = React.createClass
  mixins: [PureRenderMixin, LoadMoreProductsMixin]

  propTypes:
    categoryId:           React.PropTypes.number.isRequired
    productsFilter:       React.PropTypes.object
    productsUrl:          React.PropTypes.string
    addProductImageUrl:   React.PropTypes.string
    productsCanMove:      React.PropTypes.bool
    perPage:              React.PropTypes.number.isRequired
    includeSubcategories: React.PropTypes.bool.isRequired

  getInitialState: ->
    currentState:        LOADING_STATE
    products:            null
    page:                1
    isAllProductsLoaded: false

  componentDidMount: ->
    @loadProducts @props.categoryId, @props.includeSubcategories

  componentWillReceiveProps: (nextProps) ->
    # Category is changed
    if @props.categoryId != nextProps.categoryId || @props.includeSubcategories != nextProps.includeSubcategories
      @setState {
        page: 1
        isAllProductsLoaded: false
      }
      @loadProducts nextProps.categoryId, nextProps.includeSubcategories

  componentWillUnmount: ->
    @xhr.abort() if @xhr?
    @xhr = null

  render: ->
    switch @state.currentState
      when LOADED_STATE, LOADING_MORE_STATE
        <div>
          <OperatorProducts_List
              categoryId={ this.props.categoryId }
              addProductImageUrl={ this.props.addProductImageUrl }
              productsCanMove={ this.props.productsCanMove } />
          { this.renderLoadMoreSpinner() }
        </div>
      when LOADING_STATE then <OperatorProducts_Loading />
      when EMPTY_STATE   then <OperatorProducts_Empty categoryId={ this.props.categoryId } />
      when ERROR_STATE   then <OperatorProducts_LoadingError message={ this.state.errorMessage } />
      else console.warn 'Unknown currentState of OperatorProducts component', @state.currentState

  renderLoadMoreSpinner: ->
    <OperatorProducts_Loading /> if @isLoadingMoreState()

  isLoadingMoreState: -> @state.currentState is LOADING_MORE_STATE

  activateErrorState:       -> @setState(currentState: ERROR_STATE)
  activateLoadingState:     -> @setState(currentState: LOADING_STATE)
  activateLoadingMoreState: -> @setState(currentState: LOADING_MORE_STATE)
  activateLoadedState:      -> @setState(currentState: LOADED_STATE)

  loadProducts: (categoryId, includeSubcategories) ->
    @activateLoadingState()

    @xhr = OperatorProductsViewActions.loadProducts {
      url: @props.productsUrl
      data:
        categoryId:           categoryId
        filter:               @props.productsFilter
        includeSubcategories: includeSubcategories
        per_page:             @props.perPage
    }
      .then (response) =>
        currentState = if response.total_count == 0 then EMPTY_STATE else LOADED_STATE

        @setState
          currentState: currentState
          page: response.page
          isAllProductsLoaded: response.items.length == 0
      .fail (errMsg) =>
        unless errMsg is 'abort'
          @setState
            currentState: ERROR_STATE
            errorMessage: errMsg

  loadMoreProducts: ->
    @activateLoadingMoreState()

    @xhr = OperatorProductsViewActions.loadMoreProducts {
      url: @props.productsUrl
      data:
        categoryId:           @props.categoryId
        filter:               @props.productsFilter
        includeSubcategories: @props.includeSubcategories
        per_page:             @props.perPage
        page:                 @state.page + 1
    }
      .then (response) =>
        @setState
          currentState: LOADED_STATE
          page: response.page
          isAllProductsLoaded: response.items.length == 0
      .fail (errMsg) =>
        unless errMsg is 'abort'
          @setState
            currentState: ERROR_STATE
            errorMessage: errMsg
