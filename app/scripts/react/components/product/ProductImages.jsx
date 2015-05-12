import ProductImagesUpload from './ProductImagesUpload';
import ProductImagesImageList from './ProductImagesImageList';

let ProductImages = React.createClass({
  propTypes: {
    images: React.PropTypes.array.isRequired,
    fieldName: React.PropTypes.string.isRequired,
    onImageRotate: React.PropTypes.func.isRequired,
    onImageDelete: React.PropTypes.func.isRequired,
    onImagesUpload: React.PropTypes.func.isRequired,
    onImagesReorder: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="thumbnails">
        <div className="row">
          <ProductImagesUpload onImagesUpload={this.props.onImagesUpload} />
          <ProductImagesImageList
              images={this.props.images}
              fieldName={this.props.fieldName}
              onImagesReorder={this.props.onImagesReorder}
              onImageRotate={this.props.onImageRotate}
              onImageDelete={this.props.onImageDelete} />
        </div>
        <input type="hidden" name={this.props.fieldName} value="" />
      </div>
    );
  }
});

export default ProductImages;