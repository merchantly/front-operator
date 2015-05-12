###* @jsx React.DOM ###

LOADING_STATE = 'loading'
LOADED_STATE  = 'loaded'
ERROR_STATE   = 'error'

DELETE_TOOLTIP = 'Удалить изображение'
ROTATE_TOOLTIP = 'Повернуть изображение'

ERROR_TEXT = 'Ошибка загрузки. Перезагрузите данное изображение.'

ProductImages_Image = React.createClass
  mixins: ['ReactActivitiesUser', ComponentManipulationsMixin]

  propTypes:
    image:          React.PropTypes.object.isRequired
    size:           React.PropTypes.string
    fieldName:      React.PropTypes.string
    productId:      React.PropTypes.number
    productCardId:  React.PropTypes.number
    onImagePreload: React.PropTypes.func.isRequired
    onImageDelete:  React.PropTypes.func.isRequired
    onImageRotate:  React.PropTypes.func.isRequired

  getDefaultProps: ->
    size: '150x150'

  componentDidMount: ->
    @preloadImage() if @isLoadingState()

  getInitialState: ->
    currentState: if @props.image.id? then LOADED_STATE else LOADING_STATE
    image: @props.image

  render: ->
    loader = switch @state.currentState
      when LOADING_STATE
       <div className="thumbnails-item-loader">
          <Spinner className="fa-2x" />
        </div>

    message = switch @state.currentState
      when ERROR_STATE
       <div className="alert alert-danger">
          { ERROR_TEXT }
        </div>

    return <div data-id={ this.props.image.id }
                 className="col-xs-12 col-sm-6 col-md-3 col-lg-2 thumbnails-item">
              <div className="thumbnails-item-in">
                <img src={ this._getImageUrl() }
                     className="thumbnails-item-img" />
                { loader }
                <div className="thumbnails-item-actions">
                  <div title={ DELETE_TOOLTIP }
                       className="thumbnails-item-action"
                       onClick={ this.props.onImageDelete }>
                    <i className="fa fa-times" />
                  </div>
                  <div title={ ROTATE_TOOLTIP }
                       className="thumbnails-item-action"
                       onClick={ this.rotateImage }>
                    <i className="fa fa-rotate-right" />
                  </div>
                </div>
                { this.renderHiddenInput() }
              </div>
              { message }
            </div>

  renderHiddenInput: ->
    if @props.image.id
      <input type="hidden" name={ this.props.fieldName } value={ this.props.image.id } />

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateLoadingState: -> @setState(currentState: LOADING_STATE)
  activateLoadedState:  -> @setState(currentState: LOADED_STATE)
  activateErrorState:   -> @setState(currentState: ERROR_STATE)

  preloadImage: ->
    file = @props.image.file

    return console.warn 'Missing file object for preloading product image' unless file

    formData = new FormData()
    formData.append 'image', file

    ProductImagesViewActions.preloadImage
      file: file
      productId:     @props.productId
      productCardId: @props.productCardId
      success: (data) =>
        @activateLoadedState()
        @props.onImagePreload
          id:   data.id
          uuid: @props.image.uuid
          src:  data.url
      error:      @activateErrorState
      beforeSend: @incrementActivities
      complete:   @decrementActivities

  _getImageUrl: ->
    ThumborService.image_url @state.image?.url, @props.size

  rotateImage: ->
    @activateLoadingState()

    ProductImagesViewActions.rotateImage @props.image.id
      .then (data) =>
        @activateLoadedState()
        @props.onImageRotate data
      .fail =>
        @activateErrorState()
        setTimeout @activateLoadedState, 3000

module.exports = ProductImages_Image
