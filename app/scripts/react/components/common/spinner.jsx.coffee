###* @jsx React.DOM ###

window.Spinner = React.createClass

  propTypes:
    align:     React.PropTypes.oneOf [null, 'center']
    className: React.PropTypes.string

  render: ->
    spinnerClasses = ['fa', 'fa-spinner', 'fa-spin']

    spinnerClasses.push(@props.className) if @props.className

    if @props.align is 'center'
      spinner = `<div className="text-center">
                   <i className={ spinnerClasses.join(' ') } />
                 </div>`
    else
      spinner = `<i className={ spinnerClasses.join(' ') } />`

    spinner