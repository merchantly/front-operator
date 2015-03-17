###* @jsx React.DOM ###

window.ImagesForm_Thumbs = React.createClass

  propTypes:
    images:   React.PropTypes.array.isRequired
    onRemove: React.PropTypes.func.isRequired

  render: ->
    return null if @props.images.length == 0

    images = []

    console.log 'images', @props.images

    that = @
    $.each @props.images, (idx, image) ->
      onClick = -> that.props.onRemove image
      images.push `<div key={image.src} className='products__new-form-image-thumb-block'>
         <img className='products__new-form-image-thumb' src={image.src} />
         <div className='products__new-form-image-thumb-remove' onClick={onClick} ref='remove'></div>
         <div className='products__new-form-image-thumb-update' onClick={onClick} ref='update'></div>
       </div>`

    return `<div className='products__new-form-images-list'>{images}</div>`