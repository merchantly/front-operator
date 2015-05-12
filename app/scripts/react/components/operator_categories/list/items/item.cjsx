window.OperatorCategories_ListItem = React.createClass

  propTypes:
    category:    React.PropTypes.object.isRequired
    onEditStart: React.PropTypes.func.isRequired

  render: ->
    totalCount = if @props.category.has_children then @props.category.current_deep_products_count else @props.category.current_products_count
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