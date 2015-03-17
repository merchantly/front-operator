window.KioskOperatorApp =

  start: ({ vendor_key, operator }) ->
    console.log "KioskOperatorApp start for vendor: #{vendor_key}, operator: #{operator.name}"

    $.ajaxSetup
      xhrFields:
        withCredentials: true
        crossDomain:     true
      headers:
        'X-Vendor-Key': vendor_key

    # /*==========  Router  ==========*/

    OperatorRouteTarget = {
      categories: (req) ->
        #TODO: Render OperatorCategories with specific params
        # console.log req.queryParams
    }

    Aviator.setRoutes {
      '/operator': {
        target: OperatorRouteTarget
        '/categories': 'categories'
      }
    }

    Aviator.dispatch()

    # /*-----  End of Router  ------*/

    window.EB.emit 'start'
    ReactUjs.initialize()

  error_alert: (message) -> alert message