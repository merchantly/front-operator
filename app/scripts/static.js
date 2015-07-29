// These libs is required only in static
require('eonasdan-bootstrap-datetimepicker');
global.ReactUjs = require('reactUjs');
global.gon = require('./resources/gon');

require('./bundle');
require('./libsInit');

let { operator, vendor_key } = gon;
KioskOperatorApp.start({operator, vendor_key});
console.info('Залогинен оператор:', operator);

ReactUjs.initialize();

$('.js-row-all-checkbox, .js-row-checkbox, [ks-icheck]').iCheck({
  checkboxClass: 'icheckbox_flat-blue'
});

$('[ks-select2]').select2();

$('.iCheck-helper').on('mouseover', () => {
  $(this).closest('[data-toggle="tooltip"]').tooltip('show');
});

$('.iCheck-helper').on('mouseout', () => {
  $(this).closest('[data-toggle="tooltip"]').tooltip('hide');
});

$('[ks-select2-ajax]').select2({
  ajax: {
    url: '/json/similar.json',
    dataType: 'json',
    delay: 250,
    results(data) {
      return {results: data.items};
    }
  },

  formatResult(e) {
    return (
      '<table class="table no-margins">' +
        '<tbody>' +
          '<tr>' +
            '<td class="project-image no-borders">' +
              '<img class="project-image img-circle" src="' + e.image.url + '" />' +
            '</td>' +
            '<td class="no-borders">' + e.title + '</td>' +
          '</tr>' +
        '</tbody>' +
      '</table>'
    );
  }
});

$('[products-categories-tree]').jstree();