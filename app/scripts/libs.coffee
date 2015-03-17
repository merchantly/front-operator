window._                 = require 'lodash'
window.$ = window.jQuery = require 'jquery'
window.React             = require 'react'
window.Dispatcher        = require('flux').Dispatcher
window.EventEmitter      = require 'eventEmitter'
window.ReactUjs          = require 'reactUjs'
Requester                = require './libs/requester'
window.EB                = new EventEmitter()
window.Requester         = new Requester(eb: window.EB)

# jQuery UI components
require 'jquery.ui.core'
require 'jquery.ui.widget'
require 'jquery.ui.mouse'
require 'jquery.ui.draggable'
require 'jquery.ui.droppable'
require 'jquery.ui.sortable'

# jQuery plugins
require 'jquery.autosize'
require 'jquery.fileupload'
require 'jquery.role'

# Others
require('react-mixin-manager')(window.React)
require 'bootstrapSass'
require 'typeahead'
require 'aviator'

# Inspinia
require 'metisMenu'
require 'jquery.slimscroll'
require 'pace'
require 'select2'