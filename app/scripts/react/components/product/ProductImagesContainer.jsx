import _ from 'lodash';
import NoticeService from '../../services/Notice';
import ProductImages from './ProductImages';
import provideTranslations from '../common/provideTranslations';

const LOADING_IMAGES_MESSAGE = 'Идёт загрузка изображений..',
      SAVE_BUTTON_TEXT = 'Сохранить';

function createBlobImage(image, uuid) {
  return {
    uuid,
    id: null,
    url: image.src
  };
}

let ProductImagesContainer = React.createClass({
  propTypes: {
    images: React.PropTypes.array.isRequired,
    fieldName: React.PropTypes.string,
    t: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      fieldName: 'product[image_ids][]'
    };
  },

  getInitialState() {
    return {
      images: this.getImages()
    };
  },

  componentDidUpdate(prevProps, prevState) {
    this.hasLoadingImages() ? this.deactivateSubmitButton() : this.activateSubmitButton();
  },

  render() {
    let actions = {
      onImageRotate: this.rotateImage,
      onImageDelete: this.deleteImage,
      onImagesUpload: this.uploadImages,
      onImagesReorder: this.reorderImages
    };

    return <ProductImages {...this.state} {...actions} fieldName={this.props.fieldName} t={this.props.t}/>;
  },

  hasLoadingImages() {
    let loadingImages = this.state.images.filter((image) => {
      return image.status == 'loading';
    });

    return !!loadingImages.length;
  },

  getImages() {
    return this.props.images.map((image, i) => {
      image.position = i;
      image.errMsg = null;
      image.status = 'loaded';
      return image;
    });
  },

  rotateImage(image) {
    if (image.status == 'loading') {
      return alert('Дождитесь завершения обработки изображения');
    }

    image.status = 'loading';
    this.forceUpdate();

    ProductImagesViewActions.rotateImage(image.id)
      .then((data) => {
        _.extend(image, data);
        image.status = 'loaded';
        this.forceUpdate();
      })
      .fail(() => {
        image.status = 'error';
        image.errMsg = 'Ошибка при повороте изображения';
        this.forceUpdate();

        setTimeout(() => {
          image.status = 'loaded';
          image.errMsg = null;
          this.forceUpdate();
        }, 3000);
      });
  },

  deleteImage(image) {
    let newImages = this.state.images.slice();

    newImages.forEach((newImage, i) => {
      if (newImage == image) newImages.splice(i, 1);
    });

    this.setState({images: newImages});
  },

  uploadImages(files) {
    let newImages = this.state.images.slice(),
        lastImagePosition = 0;

    this.deactivateSubmitButton();

    if (newImages.length)
      lastImagePosition = newImages[newImages.length - 1].position + 1;

    _.forEach(files, (file) => {
      let uuid = UuidService.generate(),
          uploadFailed = false;

      let image = new Image();
      image.onload = () => {
        let newImages = this.state.images.slice(),
            blobImage = createBlobImage(image, uuid);

        _.extend(blobImage, {position: ++lastImagePosition, status: 'loading'});

        newImages.push(blobImage);
        if (!uploadFailed) {
          this.setState({images: newImages});
        }
      };
      image.src = window.URL.createObjectURL(file);

      // Делаем запрос на создание картинки, на успешный ответ заменяем blob с uuid
      ProductImagesViewActions.preloadImage({
        file,
        productId: this.props.productId,
        productCardId: this.props.productCardId,
        success: (data) => {
          let newImages = this.state.images.slice();
          let blobIndex = _.findIndex(newImages, (image) => image.uuid === uuid);

          if (blobIndex != -1) {
            _.extend(newImages[blobIndex], {
              id: data.id,
              src: data.url,
              status: 'loaded'
            });
          }

          this.setState({images: newImages});
        },
        error: (jqXHR) => {
          let newImages = this.state.images.slice();
          let blobIndex = _.findIndex(newImages, (image) => image.uuid === uuid);

          uploadFailed = true;

          if (blobIndex !== -1) newImages.splice(blobIndex, 1);

          NoticeService.errorResponse(jqXHR);
          this.setState({images: newImages});
        }
      });
    });
  },

  reorderImages(imagesData) {
    let newImages = this.state.images.slice();

    newImages.forEach((image) => {
      imagesData.forEach((imageData) => {
        if (image.id == imageData.id) _.extend(image, imageData);
      });
    })

    this.setState({images: newImages});
  },

  activateSubmitButton() {
    let $submitButton = $('[data-button-save]');
    $submitButton.removeAttr('disabled').text(SAVE_BUTTON_TEXT);
  },

  deactivateSubmitButton() {
    let $submitButton = $('[data-button-save]');
    $submitButton.attr('disabled', 'disabled').text(LOADING_IMAGES_MESSAGE);
  }
});

export default provideTranslations(ProductImagesContainer);
