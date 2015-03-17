###* @jsx React.DOM ###

#TODO: i18n
TITLE = 'Все товары'

SWITCH_CATEGORY_TIMEOUT = 200

window.OperatorCategories_ListItemWithSubcategories = React.createClass
  mixins: [CategoryDroppable]

  propTypes:
    category:         React.PropTypes.object.isRequired
    isActive:         React.PropTypes.bool.isRequired
    onCategorySelect: React.PropTypes.func.isRequired

  getInitialState: ->
    @getStateFromStore()

  componentDidMount: ->
    DragStateStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    DragStateStore.removeChangeListener @_onStoreChange

  render: ->
    totalCount           = @props.category.current_deep_products_count
    withoutCategoryCount = @props.category.current_products_count
    itemClasses = React.addons.classSet
      'adm-categories-item': true
      'selected': @props.isActive
      '__droptarget-active': @isDropTarget()

    return `<div className={ itemClasses }
                 onClick={ this.handleClick }
                 onMouseEnter={ this.handleMouseEnter }
                 onMouseLeave={ this.handleMouseLeave }>
              <span className="adm-categories-item-name">
                { TITLE }
              </span>
              <span className="adm-categories-item-counter">
                { totalCount }
              </span>
            </div>`

  isDropTarget: ->
    @state.isDroppable && !@props.isActive

  handleMouseEnter: ->
    if @isDropTarget()
      @timeout = setTimeout (=>
        @props.onCategorySelect {
          category: @props.category
          includeSubcategories: true
        }
      ), SWITCH_CATEGORY_TIMEOUT

  handleMouseLeave: ->
    clearTimeout @timeout if @timeout

  handleClick: ->
    @props.onCategorySelect {
      category: @props.category
      includeSubcategories: true
    }

  getStateFromStore: ->
    isDroppable: DragStateStore.isDragged()

  _onStoreChange: ->
    @setState @getStateFromStore()