###* @jsx React.DOM ###

SWITCH_CATEGORY_TIMEOUT = 200

window.OperatorCategories_ListItemManager = React.createClass
  mixins: [CategoryDroppable]

  propTypes:
    category:                 React.PropTypes.object.isRequired
    isActive:                 React.PropTypes.bool.isRequired
    changeProductCategoryUrl: React.PropTypes.string
    onCategorySelect:         React.PropTypes.func.isRequired

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    DragStateStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    DragStateStore.removeChangeListener @_onStoreChange

  render: ->
    managerClasses = React.addons.classSet {
      'adm-categories-item': true
      'selected': @props.isActive
      '__muted':  !@isVisible()
      '__droptarget-active': @isDropTarget()
    }

    return `<div className={ managerClasses }
                 data-objectid={ this.props.category.id }
                 onClick={ this.handleItemClick }
                 onMouseEnter={ this.handleMouseEnter }
                 onMouseLeave={ this.handleMouseLeave }>
              <OperatorCategories_ListItem
                  category={ this.props.category }
                  onEditStart={ this.handleEditStart } />
            </div>`

  isDropTarget: ->
    @state.isDroppable && !@props.isActive

  isVisible: ->
    @props.category.is_visible

  handleEditStart: (e) ->
    e.stopPropagation()
    e.preventDefault()
    window.location = Routes.operator_categories_edit_url @props.category.id

  handleItemClick: ->
    totalCount           = @props.category.current_deep_products_count
    withoutCategoryCount = @props.category.current_products_count

    @props.onCategorySelect
      category: @props.category
      includeSubcategories: true

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

  getStateFromStore: ->
    isDroppable: DragStateStore.isDragged()

  _onStoreChange: ->
    @setState @getStateFromStore()

# /*===============================================
# =            Previous component view            =
# ===============================================*/

# ###* @jsx React.DOM ###

# SWITCH_CATEGORY_TIMEOUT = 200
# VIEW_STATE = 'view'
# EDIT_STATE = 'edit'

# window.OperatorCategories_ListItemManager = React.createClass
#   mixins: [CategoryDroppable]

#   propTypes:
#     category:         React.PropTypes.object.isRequired
#     isActive:         React.PropTypes.bool.isRequired
#     onCategorySelect: React.PropTypes.func.isRequired

#   getInitialState: ->
#     _.extend {}, @getStateFromStore(), {
#       currentState: VIEW_STATE
#     }

#   componentDidMount: ->
#     DragStateStore.addChangeListener @_onStoreChange

#   componentWillUnmount: ->
#     DragStateStore.removeChangeListener @_onStoreChange

#   render: ->
#     item = @getItem()
#     managerClasses = React.addons.classSet {
#       'adm-categories-item': true
#       'selected': @props.isActive
#       '__edit': @isEditState()
#       '__droptarget-active': @isDropTarget()
#     }

#     return `<div className={ managerClasses }
#                  data-objectid={ this.props.category.id }
#                  onClick={ this.handleItemClick }
#                  onMouseEnter={ this.handleMouseEnter }
#                  onMouseLeave={ this.handleMouseLeave }>
#               { item }
#             </div>`

#   isEditState: -> @state.currentState is EDIT_STATE
#   isDropTarget: ->
#     @state.isDroppable && !@props.isActive

#   activateViewState: -> @setState(currentState: VIEW_STATE)
#   activateEditState: -> @setState(currentState: EDIT_STATE)

#   getItem: ->
#     switch @state.currentState
#       when VIEW_STATE
#         item = `<OperatorCategories_ListItem
#                     category={ this.props.category }
#                     onEditStart={ this.handleEditStart } />`
#       when EDIT_STATE
#         item = `<OperatorCategories_ListItemEdit
#                     category={ this.props.category }
#                     onEditFinish={ this.activateViewState } />`

#     item

#   handleEditStart: (e) ->
#     e.stopPropagation()
#     e.preventDefault()
#     @activateEditState()

#   handleItemClick: ->
#     @props.onCategorySelect {
#       category: @props.category
#       includeSubcategories: true
#     }

#   handleMouseEnter: ->
#     if @isDropTarget()
#       @timeout = setTimeout (=>
#         @props.onCategorySelect {
#           category: @props.category
#           includeSubcategories: true
#         }
#       ), SWITCH_CATEGORY_TIMEOUT

#   handleMouseLeave: ->
#     clearTimeout @timeout if @timeout

#   getStateFromStore: ->
#     isDroppable: DragStateStore.isDragged()

#   _onStoreChange: ->
#     @setState @getStateFromStore()

# /*-----  End of Previous component view  ------*/