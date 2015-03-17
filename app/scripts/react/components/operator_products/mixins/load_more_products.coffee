windowHeight = $(window).height()
THRESHOLD    = windowHeight * 2

window.LoadMoreProductsMixin =

  componentDidMount: ->
    $(window).on 'scroll', @handleScroll

  componentWillUnmount: ->
    $(window).off 'scroll', @handleScroll

  handleScroll: ->
    if !@isLoadingMoreState() && !@state.isAllProductsLoaded
      isNearBottom = $(window).scrollTop() + windowHeight > $(document).height() - THRESHOLD

      @loadMoreProducts() if isNearBottom