###* @jsx React.DOM ###

FileUploadMixin = require './mixins/file_upload'

VIEW_STATE     = 'view'
DROPZONE_STATE = 'dropZone'

ADD_TOOLTIP = 'Добавить изображение'

ProductImages_Placeholder = React.createClass
  mixins: [FileUploadMixin]

  getInitialState: ->
    currentState: VIEW_STATE

  render: ->
    return `<div className="col-xs-12 col-sm-6 col-md-3 col-lg-2 thumbnails-item thumbnails-item-add">
              <div className="thumbnails-item-in">
                <div className="thumbnails-item-actions">
                  <div className="thumbnails-item-action">
                    <i className="fa fa-plus" />
                  </div>
                </div>
                <label htmlFor="image"
                       title={ ADD_TOOLTIP }
                       className="thumbnails-item-input">
                  <input ref="fileInput"
                         type="file"
                         accept="image/*"
                         multiple={ true }
                         id="image"
                         className="hide" />
                </label>
              </div>
            </div>`

  isDropzoneState: -> @state.currentState is DROPZONE_STATE

  activateDropzoneState: -> @setState(currentState: DROPZONE_STATE)
  activateViewState:     -> @setState(currentState: VIEW_STATE)

module.exports = ProductImages_Placeholder