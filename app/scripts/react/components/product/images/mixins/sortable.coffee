DRAG_DELAY  = 100
DRAG_REVERT = 100

_getNewPositions = (image, insertIndex) ->
  originalIndex = image.position

  return [] if insertIndex == originalIndex

  oldImagesPositions = _.reject @props.images, (i) -> i == image

  previousSibling = oldImagesPositions[insertIndex - 1] unless insertIndex < 1
  nextSibling     = oldImagesPositions[insertIndex]     unless insertIndex > oldImagesPositions.length - 1

  if not previousSibling and not nextSibling
    return [{
      id: image.id
      position: 0
    }]

  # If we insert category at the end of list
  unless nextSibling
    return [{
      id: image.id
      position: previousSibling.position + 1
    }]

  # If we insert category at the start of list, then set mock data
  unless previousSibling
    previousSibling = {
      id: null
      position: -1
    }

  # Если есть "место" в номерах позиций - просто используем его
  positionDiff = nextSibling.position - previousSibling.position
  if positionDiff > 1
    return [{
      id:       image.id
      position: previousSibling.position + 1
    }]

  # Если оптимизации не сработали, просто сдвигаем хвост вниз
  slicePosition = previousSibling.position + 1
  newPositions = [{
    id: image.id
    position: slicePosition
  }]
  oldTail = oldImagesPositions[insertIndex..]

  for imageToShift in oldTail
    minPosition     = slicePosition + 1
    currentPosition = imageToShift.position

    # Проверяем: возможно, не надо двигать все элементы
    if currentPosition < minPosition
      currentPosition = minPosition
      newPositions.push {
        id: imageToShift.id
        position: currentPosition
      }
      slicePosition = currentPosition + 1

  return newPositions

ProductImageSortableMixin =

  propTypes:
    images:          React.PropTypes.array.isRequired
    onImagesReorder: React.PropTypes.func.isRequired

  componentDidMount: ->
    $(@getDOMNode()).sortable {
      scope: 'productImagesReorder'
      placeholder: 'col-xs-12 col-sm-6 col-md-3 col-lg-2 thumbnails-item __dropzone'
      forcePlaceholderSize: true
      revert: DRAG_REVERT
      delay:  DRAG_DELAY
      stop: @handleDrop
    }

  handleDrop: (evt, ui) ->
    imageId     = parseInt ui.item.data('id'), 10
    insertIndex = ui.item.index()

    $(@getDOMNode()).sortable 'cancel'

    @reorderImages {imageId, insertIndex}

  reorderImages: ({imageId, insertIndex}) ->
    newPositions = @getReorderedPositions imageId, insertIndex

    @props.onImagesReorder(newPositions) if newPositions.length

  getImageById: (imageId) ->
    for image in @props.images when image.id == imageId
      return image

  getReorderedPositions: (imageId, insertIndex) ->
    image = @getImageById imageId

    _getNewPositions.apply @, [image, insertIndex]

module.exports = ProductImageSortableMixin