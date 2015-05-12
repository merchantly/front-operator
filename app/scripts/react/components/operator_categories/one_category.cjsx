###* @jsx React.DOM ###

window.OperatorCategories_OneCategory = React.createClass

  propTypes:
    parentCategory:           React.PropTypes.object.isRequired
    currentCategory:          React.PropTypes.object.isRequired
    includeSubcategories:     React.PropTypes.bool.isRequired
    changeProductCategoryUrl: React.PropTypes.string
    onCategorySelect:         React.PropTypes.func.isRequired

  render: ->
    <div className="adm-categories-grid-col">
      <OperatorCategories_List
          parentCategory={ this.props.parentCategory }
          currentCategory={ this.props.currentCategory }
          productsFilter={ this.props.productsFilter }
          changeProductCategoryUrl={ this.props.changeProductCategoryUrl }
          includeSubcategories={ this.props.includeSubcategories }
          onCategorySelect={ this.props.onCategorySelect } />
    </div>