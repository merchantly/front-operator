class Requester

  constructor: ({ eb }) ->
    @start = false
    @eb = eb
    eb.on 'start', =>
      @start = true
      console.log 'Requester started'

  request: (options) =>
    if @start
      $.ajax options
    else
      @eb.on 'start', -> $.ajax options

module.exports = Requester