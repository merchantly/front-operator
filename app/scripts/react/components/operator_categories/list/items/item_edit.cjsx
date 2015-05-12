###* @jsx React.DOM ###

#TODO: i18n
ERROR_MESSAGE = 'Ошибка обновления категории.'

INPUT_STATE  = 'input'
UPDATE_STATE = 'update'
ERROR_STATE  = 'error'

window.OperatorCategories_ListItemEdit = React.createClass

  propTypes:
    category:     React.PropTypes.object.isRequired
    onEditFinish: React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: INPUT_STATE
    categoryName: @props.category.name

  componentDidMount: ->
    inputNode = @refs.input.getDOMNode()

    AppHelpers.reselectAndFocus inputNode

  render: ->
    switch @state.currentState
      when INPUT_STATE
        form = <span>
                 <input ref="input"
                        type="text"
                        className="adm-categories-item-field"
                        defaultValue={ this.state.categoryName }
                        onKeyDown={ this.handleKeydown }
                        onClick={ this.handleClick }
                        onBlur={ this.props.onEditFinish } />
                 <span className="adm-categories-item-remove" onClick={ this.handleDeleteClick } />
               </span>
      when UPDATE_STATE
        form = <span>
                 <span className="adm-categories-item-name text-muted">
                   { this.state.categoryName }
                 </span>
                 <span className="adm-categories-item-name">
                   <Spinner />
                 </span>
               </span>
      when ERROR_STATE
        form = <span>&nbsp;&nbsp;&nbsp;<i>{ ERROR_MESSAGE }</i></span>
      else console.warn 'Unknown currentState of OperatorCategories_ListItemEdit component', @state.currentState

    form

  activateErrorState: -> @setState(currentState: ERROR_STATE)

  editCategory: ->
    inputNode = @refs.input.getDOMNode()
    categoryName = inputNode.value

    @setState {
      currentState: UPDATE_STATE
      categoryName: categoryName
    }

    updatedCategory      = _.clone @props.category
    updatedCategory.name = categoryName

    OperatorCategoriesViewActions.updateCategory {
      category: updatedCategory
      success:  @props.onEditFinish
      error:    @activateErrorState
    }

  handleDeleteClick: ->
    if window.confirm "Удалить категорию \"#{ @props.category.name }\"?"
      OperatorCategoriesViewActions.deleteCategory
        category: @props.category
        error:    @activateErrorState

  handleClick: (e) ->
    e.stopPropagation()

  handleKeydown: (e) ->
    switch e.key
      when 'Enter'
        e.preventDefault()
        @editCategory()
      when 'Escape'
        e.preventDefault()
        @props.onEditFinish()