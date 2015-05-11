###* @jsx React.DOM ###

window.ProductThumb = React.createClass

  propTypes:
    product: React.PropTypes.object.isRequired
    style:   React.PropTypes.string

  getDefaultProps: ->
    style: '50x50'

  render: ->
    <img src={ this._getImageUrl() } alt={ this.props.product.title } className="adm-categories-goods-thumb" />

  _getImageUrl: ->
    ThumborService.image_url @props.product.image?.url, @props.style