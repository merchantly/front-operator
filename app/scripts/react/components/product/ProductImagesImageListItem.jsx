let ProductImagesImageListItem = React.createClass({
  propTypes: {
    image: React.PropTypes.object.isRequired,
    fieldName: React.PropTypes.string.isRequired,
    onImageRotate: React.PropTypes.func.isRequired,
    onImageDelete: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      size: '150x150'
    };
  },

  render() {
    return (
      <div data-id={this.props.image.id}
           className="col-xs-12 col-sm-6 col-md-3 col-lg-2 thumbnails-item">
        <div className="thumbnails-item-in">
          <img src={this.getImageUrl()} className="thumbnails-item-img" />
          {this.renderSpinner()}
          <div className="thumbnails-item-actions">
            <div title="Удалить изображение"
                 className="thumbnails-item-action"
                 onClick={this.props.onImageDelete}>
              <i className="fa fa-times" />
            </div>
            <div title="Повернуть изображение"
                 className="thumbnails-item-action"
                 onClick={this.props.onImageRotate}>
              <i className="fa fa-rotate-right" />
            </div>
          </div>
          {this.renderHiddenInput()}
        </div>
        {this.renderErrorMessage()}
      </div>
    );
  },

  renderHiddenInput() {
    if (this.props.image.id)
      return <input type="hidden" name={this.props.fieldName} value={this.props.image.id} />;
  },

  renderSpinner() {
    if (this.props.image.status == 'loading') {
      return (
        <div className="thumbnails-item-loader">
          <Spinner className="fa-2x" />
        </div>
      );
    }
  },

  renderErrorMessage() {
    if (this.props.image.errMsg != null) {
      return (
        <div className="alert alert-danger">
          {this.props.image.errMsg}
        </div>
      );
    }
  },

  getImageUrl() {
    return ThumborService.image_url(this.props.image.url, this.props.size);
  }
});

export default ProductImagesImageListItem;