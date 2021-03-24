import _ from 'lodash';
import DropZone from '../common/DropZone';
import NoticeService from '../../services/Notice';

let ProductImagesUpload = React.createClass({
  propTypes: {
    onImagesUpload: React.PropTypes.func.isRequired,
    t: React.PropTypes.func.isRequired
  },
  handleClick(ev) {
    ev.target.value = null;
  },
  handleChange(ev) {
    let files = ev.target.files;
    if (files.length) this.props.onImagesUpload(files);
  },
  handleDrop(files) {
    const imageFiles = [];
    const notImageFiles = [];

    _.forEach(files, (file) => {
      if (file.type.match(/(\.|\/)(gif|jpe?g|png|svg)$/i)) {
        imageFiles.push(file);
      } else {
        notImageFiles.push(file);
      }
    });

    if (notImageFiles.length) {
      const fileNames = notImageFiles.map((file) => file.name);
      const listItems = '<li>' + fileNames.join('</li><li>') + '</li>';
      NoticeService.notifyError('Файлы, которые не являются изображениями: <ul>' + listItems + '</ul>');
    }

    if (imageFiles.length) {
      this.props.onImagesUpload(imageFiles);
    }
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
            <label title={this.props.t('product_images_upload.add')}
                   htmlFor="image"
                   className="thumbnails-item-input">
              <input
                accept="image/*"
                className="hide"
                id="image"
                multiple={true}
                onChange={this.handleChange}
                onClick={this.handleClick}
                ref="fileInput"
                type="file"
              />
            </label>
          </div>
        </div>
      </DropZone>
    );
  }
});

export default ProductImagesUpload;
