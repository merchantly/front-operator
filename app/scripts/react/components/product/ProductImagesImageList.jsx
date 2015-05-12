import ProductImageSortableMixin from './mixins/sortable';
import ProductImagesImageListItem from './ProductImagesImageListItem';

let ProductImagesImageList = React.createClass({
  mixins: [ProductImageSortableMixin],
  propTypes: {
    images: React.PropTypes.array.isRequired,
    fieldName: React.PropTypes.string.isRequired,
    onImagesReorder: React.PropTypes.func.isRequired,
    onImageRotate: React.PropTypes.func.isRequired,
    onImageDelete: React.PropTypes.func.isRequired
  },

  render() {
    let imageList = this.props.images
      .sort((a, b) => a.position - b.position)
      .map((image) => {
        return (
          <ProductImagesImageListItem
              image={image}
              fieldName={this.props.fieldName}
              onImageRotate={this.props.onImageRotate.bind(null, image)}
              onImageDelete={this.props.onImageDelete.bind(null, image)}
              key={image.uuid || image.id} />
        );
      });

    return (
      <div ref="list" className="thumbnails-list">
        {imageList}
      </div>
    );
  }
});

export default ProductImagesImageList;