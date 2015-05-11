###* @jsx React.DOM ###

ProductImages_Placeholder = require './placeholder'
ProductImages_List        = require './list'
ImagesMixin               = require './mixins/images'

window.ProductImages = React.createClass
  mixins: ['ReactActivitiesMixin', ImagesMixin]

  propTypes:
    images:        React.PropTypes.array.isRequired
    fieldName:     React.PropTypes.string.isRequired
    productId:     React.PropTypes.number
    productCardId: React.PropTypes.number

  getDefaultProps: ->
    fieldName: 'product[image_ids][]'
    images: [
      id: 4682, url: 'assets/product-1-square.png?1'
      id: 4681, url: 'assets/product-2-square.png?1'
      id: 4680, url: 'assets/product-3-square.png?1'
    ]

  getInitialState: ->
    images: @convertRawImages()

  # Здесь нужен пустой input, иначе невозможно удалить все картинки
  render: ->
    <div className="thumbnails">
      <div className="row">
        <ProductImages_Placeholder onImagesAdd={ this.pushImages } />
        <ProductImages_List
            images={ this.state.images }
            fieldName={ this.props.fieldName }
            productId={ this.props.productId }
            productCardId={ this.props.productCardId }
            activitiesHandler={ this.activitiesHandler }
            onImagesReorder={ this.updateImages }
            onImagePreload={ this.updateImage }
            onImageRotate={ this.updateImage }
            onImageDelete={ this.deleteImage } />
      </div>
      <input type="hidden" name={ this.props.fieldName } value="" />
    </div>