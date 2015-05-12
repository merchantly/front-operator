global._ = require('lodash');
global.$ = global.jQuery = require('jquery');
global.Dispatcher = require('flux').Dispatcher;
global.EventEmitter = require('eventEmitter');
var Requester = require('./requester');
global.EB = new EventEmitter();
global.Requester = new Requester({eb: global.EB});
global.toastr = require('toastr');

// jQuery UI components
require('jquery.ui.core');
require('jquery.ui.widget');
require('jquery.ui.mouse');
require('jquery.ui.draggable');
require('jquery.ui.droppable');
require('jquery.ui.sortable');

// jQuery plugins
require('jquery.autosize');
require('jquery.fileupload');
require('jquery.role');
require('jquery.flot');

// Others
require('react-mixin-manager')(global.React);
require('bootstrapSass');
require('typeahead');

// Inspinia
require('metisMenu');
require('pace');
require('select2');

require('iCheck');
require('jstree');