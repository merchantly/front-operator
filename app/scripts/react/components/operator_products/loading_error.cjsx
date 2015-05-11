###* @jsx React.DOM ###

window.OperatorProducts_LoadingError = React.createClass

  propTypes:
    message: React.PropTypes.string.isRequired

  render: ->
    <div className="adm-categories-content">
      Ошибка загрузки { this.props.message }.
    </div>