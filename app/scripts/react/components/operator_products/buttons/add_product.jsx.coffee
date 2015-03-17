###* @jsx React.DOM ###

#TODO: i18n
TITLE = 'Добавить новый товар'

OperatorProducts_AddProductButton = React.createClass

  propTypes:
    categoryId: React.PropTypes.number.isRequired

  render: ->
   `<button
        className="adm-btn-add-goods"
        onClick={ this.handleClick }>
      <i className="adm-btn-add-goods-icon" />
      { TITLE }
    </button>`

  handleClick: ->
    baseUrl = Routes.operator_product_new_url()
    backUrl = encodeURIComponent window.location.href

    window.location = baseUrl + '?category_id=' + @props.categoryId + 
                                '&backurl=' + backUrl

module.exports = OperatorProducts_AddProductButton