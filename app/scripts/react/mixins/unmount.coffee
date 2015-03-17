window.UnmountMixin =

  unmount: ->
    _.defer =>
      React.unmountComponentAtNode @getDOMNode().parentNode