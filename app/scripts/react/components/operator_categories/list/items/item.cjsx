window.OperatorCategories_ListItem = React.createClass

  propTypes:
    category:    React.PropTypes.object.isRequired
    onEditStart: React.PropTypes.func.isRequired

  render: ->
    totalCount = if @props.category.hasChildren then @props.category.currentDeepProductsCount else @props.category.currentProductsCount
    <span>
      <span>
        <span className="adm-categories-item-name">
          { this.props.category.name }
        </span>
        <span className="adm-categories-item-counter">
          { totalCount }
        </span>
      </span>
      <button
          className="adm-btn-edit-category"
          title="Редактировать"
          onClick={ this.props.onEditStart }>
        <span>Редактировать</span>
      </button>
    </span>
