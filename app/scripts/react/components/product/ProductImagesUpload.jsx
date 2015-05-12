import DropZone from '../common/DropZone';

let ProductImagesUpload = React.createClass({
  propTypes: {
    onImagesUpload: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <DropZone
          global={true}
          onDrop={this.handleDrop}>
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-2 thumbnails-item thumbnails-item-add">
          <div className="thumbnails-item-in">
            <div className="thumbnails-item-actions">
              <div className="thumbnails-item-action">
                <i className="fa fa-plus" />
              </div>
            </div>
            <label title="Добавить изображение"
                   htmlFor="image"
                   className="thumbnails-item-input">
              <input ref="fileInput"
                     type="file"
                     accept="image/*"
                     multiple={true}
                     id="image"
                     className="hide"
                     onChange={this.handleChange} />
            </label>
          </div>
        </div>
      </DropZone>
    );
  },

  handleDrop(files) {
    if (files.length) this.props.onImagesUpload(files);
  },

  handleChange(e) {
    let files = e.target.files;
    if (files.length) this.props.onImagesUpload(files);
  }
});

export default ProductImagesUpload;