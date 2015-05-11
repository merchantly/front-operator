###* @jsx React.DOM ###

window.OperatorCategories_TwoCategories = React.createClass

  propTypes:
    parentCategory:           React.PropTypes.object.isRequired
    currentCategory:          React.PropTypes.object.isRequired
    includeSubcategories:     React.PropTypes.bool.isRequired
    changeProductCategoryUrl: React.PropTypes.string
    onCategorySelect:         React.PropTypes.func.isRequired

  render: ->
    currentCategory      = @props.currentCategory
    currentCategoryLevel = OperatorCategoriesStore.getCategoryLevel currentCategory

    secondCategory = switch
      when currentCategoryLevel == 1 then currentCategory
      else OperatorCategoriesStore.getCategoryById currentCategory.parent_id

    return <span>
              <div className="adm-categories-grid-col">
                <OperatorCategories_List
                    parentCategory={ this.props.parentCategory }
                    currentCategory={ this.props.currentCategory }
                    changeProductCategoryUrl={ this.props.changeProductCategoryUrl }
                    includeSubcategories={ this.props.includeSubcategories }
                    onCategorySelect={ this.props.onCategorySelect } />
              </div>
              <div className="adm-categories-grid-col">
                 <OperatorCategories_List
                     parentCategory={ secondCategory }
                     currentCategory={ this.props.currentCategory }
                     changeProductCategoryUrl={ this.props.changeProductCategoryUrl }
                     includeSubcategories={ this.props.includeSubcategories }
                     onCategorySelect={ this.props.onCategorySelect } />
              </div>
            </span>