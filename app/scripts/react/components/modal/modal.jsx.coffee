###* @jsx React.DOM ###

#TODO:
# 1. Make actions & service when architecture will be complicated
# 2. safeUpdateState
# 3. Memory leaks occurs when component unmount. The problem in boostrap modal
# component

LOADING_STATE = 'loading'
LOADED_STATE  = 'loaded'

window.ModalComponent = React.createClass
  mixins: [UnmountMixin]

  propTypes:
    url: React.PropTypes.string.isRequired

  getInitialState: ->
    currentState: LOADING_STATE
    content: ''

  componentDidMount: ->
    $modal = $( @getDOMNode() )

    @loadUrl()

    $modal.modal 'show'
    $modal.on 'hidden.bs.modal', @unmount

  componentWillUnmount: ->
    $modal = $( @getDOMNode() )
    $modal.off 'hidden.bs.modal', @unmount

  render: ->
    if @isLoadingState()
      spinner = `<div className="modal-body">
                   <div className="text-center">
                     <Spinner className="fa-5x" />
                   </div>
                 </div>`

    return `<div className="modal fade"
                 aria-hidden="true"
                 tabIndex="-1">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  { spinner }
                  <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                </div>
              </div>
            </div>`

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateLoadedState: -> @setState(currentState: LOADED_STATE)

  loadUrl: ->
    Requester.request
      url: @props.url
      success: (content) =>
        # Temporarily
        $(document).trigger 'page:change'
        @setState {
          content: content
          currentState: LOADED_STATE
        }