###* @jsx React.DOM ###

#TODO: i18n
PLACEHOLDER = 'Новая категория'

window.OperatorCategories_CreateForm = React.createClass

  propTypes:
    parentCategory: React.PropTypes.object

  render: ->
   `<div className="adm-categories-item">
      <span className="adm-btn-add-category"
            onClick={ this.handleClick }>
        <i className="adm-btn-add-goods-icon" />
        { PLACEHOLDER }
      </span>
    </div>`

  handleClick: ->
    window.location = Routes.operator_categories_new_url @props.parentCategory.id

# /*===============================================
# =            Previous component view            =
# ===============================================*/

# ###* @jsx React.DOM ###

# #TODO: i18n
# PLACEHOLDER   = 'Новая категория'
# ERROR_MESSAGE = 'Ошибка создания категории.'

# INPUT_STATE   = 'input'
# CREATE_STATE  = 'create'
# ERROR_STATE   = 'error'

# window.OperatorCategories_CreateForm = React.createClass

#   propTypes:
#     parentCategory: React.PropTypes.object

#   getInitialState: ->
#     currentState: INPUT_STATE
#     categoryName: ''

#   render: ->
#     switch @state.currentState
#       when INPUT_STATE
#         form = `<div className="adm-categories-item __edit">
#                   <input
#                       ref="input"
#                       type="text"
#                       className="adm-categories-item-field"
#                       placeholder={ PLACEHOLDER }
#                       onKeyDown={ this.handleKeyDown }
#                       onBlur={ this.restoreDefaultsAndBlur } />
#                 </div>`
#       when CREATE_STATE
#         form = `<div className="adm-categories-item">
#                   <span className="adm-categories-item-name text-muted">
#                     { this.state.categoryName }
#                   </span>
#                   <span className="adm-categories-item-name">
#                     <Spinner />
#                   </span>
#                 </div>`
#       when ERROR_STATE
#         form = `<div>{ ERROR_MESSAGE }</div>`
#       else console.warn 'Unknown currentState of OperatorCategories_CreateForm component', @state.currentState

#     form

#   activateErrorState: -> @setState(currentState: ERROR_STATE)

#   createCategory: ->
#     inputNode = @refs.input.getDOMNode()
#     categoryName = inputNode.value
#     parentId = if @props.parentCategory then @props.parentCategory.id else null

#     @setState {
#       currentState: CREATE_STATE
#       categoryName: categoryName
#     }

#     OperatorCategoriesViewActions.createCategory {
#       name:     categoryName
#       parentId: parentId
#       success:  @restoreDefaults
#       error:    @activateErrorState
#     }

#   restoreDefaults: ->
#     @setState @getInitialState()

#   restoreDefaultsAndBlur: ->
#     inputNode = @refs.input.getDOMNode()
#     inputNode.value = ''
#     inputNode.blur()

#     @restoreDefaults()

#   handleKeyDown: (e) ->
#     switch e.key
#       when 'Enter'
#         e.preventDefault()
#         @createCategory()
#       when 'Escape'
#         e.preventDefault()
#         @restoreDefaultsAndBlur()

# /*-----  End of Previous component view  ------*/