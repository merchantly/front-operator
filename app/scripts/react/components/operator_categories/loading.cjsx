###* @jsx React.DOM ###

window.OperatorCategories_Loading = React.createClass

  render: ->
    <div className="adm-categories-grid">
      <div className="adm-categories-grid-col">
        <br />
        <Spinner
            className="fa-3x"
            align="center" />
      </div>
    </div>