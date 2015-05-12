{ PropTypes } = React

DropZone = React.createClass
  displayName: 'DropZone'

  propTypes:
    global: PropTypes.bool
    children: PropTypes.oneOfType([
      PropTypes.element, PropTypes.array
    ]).isRequired
    onDragOver: PropTypes.func
    onDragLeave: PropTypes.func
    onDrop: PropTypes.func

  getDefaultProps: ->
    global: false

  componentDidMount: ->
    if @props.global
      $(document).on 'dragover', @handleDragOver
      $(document).on 'dragleave', @handleDragLeave
      $(document).on 'drop', @handleDrop

  componentWillUnmount: ->
    if @props.global
      $(document).off 'dragover', @handleDragOver
      $(document).off 'dragleave', @handleDragLeave
      $(document).off 'drop', @handleDrop

  handleDragOver: (e) ->
    e.preventDefault()
    @props.onDragOver?()

  handleDragLeave: (e) ->
    e.preventDefault()
    @props.onDragLeave?()

  handleDrop: (e) ->
    e.preventDefault()
    files = e.originalEvent.dataTransfer.files
    @props.onDrop? files

  render: ->
    <div>{ @props.children }</div>

module.exports = DropZone