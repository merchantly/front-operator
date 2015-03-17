window.ModalController =

  show: (url) ->
    container = document.querySelectorAll('[modal-container]')[0]

    unless container
      container = $('<\div>', {'modal-container': ''}).appendTo('body')[0]

    React.renderComponent ModalComponent({url}), container