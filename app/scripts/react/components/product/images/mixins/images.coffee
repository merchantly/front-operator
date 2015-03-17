#TODO: i18n
LOADING_IMAGES_MESSAGE = 'Идёт загрузка изображений..'
SAVE_BUTTON_TEXT       = 'Сохранить'

ImagesMixin =

  propTypes:
    images: React.PropTypes.array.isRequired

  componentDidUpdate: (prevProps, prevState) ->
    if @hasActivities() then @_deactivateSubmitButton() else @_activateSubmitButton()

  updateImages: (imagesData) ->
    newImages = @state.images[..]

    for newImage in newImages
      for imageData in imagesData when imageData.id == newImage.id
        _.extend newImage, imageData
        break

    @setState(images: newImages)

  updateImage: (oldImage, data) ->
    newImages = @state.images[..]

    for newImage in newImages when newImage is oldImage
      _.extend newImage, data
      break

    @setState(images: newImages)

  pushImages: (images) ->
    newImages = @state.images[..]
    lastImagePosition = 0

    @_deactivateSubmitButton()

    if newImages.length
      lastImagePosition = newImages[newImages.length - 1].position + 1

    for image in images
      _.extend image, { position: ++lastImagePosition }
      newImages.push image

    @setState(images: newImages)

  deleteImage: (image) ->
    newImages = @state.images[..]

    for newImage, i in newImages when newImage is image
      newImages.splice i, 1
      break

    @setState(images: newImages)

  convertRawImages: ->
    @props.images.map (image, i) ->
      image.position = i
      image

  _activateSubmitButton: ->
    $submitButton = $('[data-button-save]')
    $submitButton
      .removeAttr 'disabled'
      .text SAVE_BUTTON_TEXT

  _deactivateSubmitButton: ->
    $submitButton = $('[data-button-save]')
    $submitButton
      .attr 'disabled', 'disabled'
      .text LOADING_IMAGES_MESSAGE

  handleFormSubmit: (e) ->
    e.preventDefault() if @hasActivities()

  handlePageClose: ->
    if @hasActivities()
      @state.activities + ' изображений ещё не загрузилось. Вы уверены, что хотите выйти?'

module.exports = ImagesMixin