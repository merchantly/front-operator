# Here we can require local settings
window.React             = require 'react'
window.ReactUjs          = require 'reactUjs'
require './local/gon'
require './dist'
require './local/routes'


mockOperator = require './data/operator.json'
console.log 'Залогинен оператор:', mockOperator

# Запиши сюда ключ вендора на проверяемом api
# test это реальный токен от вендора (3 kaskad) на 3001.vkontraste.ru
vendorKey = localStorage.getItem('vendor_key') || 'test'

KioskOperatorApp.start(
  vendor_key: vendorKey
  operator: mockOperator
)

ReactUjs.initialize()

# Не используется
# require './inspinia'

$('.js-row-all-checkbox, .js-row-checkbox, [ks-icheck]').iCheck
  checkboxClass: 'icheckbox_flat-blue'

$('[ks-select2]').select2()

$('.iCheck-helper').on 'mouseover', ->
  $(this).closest('[data-toggle="tooltip"]').tooltip 'show'

$('.iCheck-helper').on 'mouseout', ->
  $(this).closest('[data-toggle="tooltip"]').tooltip 'hide'

#$('[data-toggle="tooltip"]').tooltip()
$('[data-toggle="popover"]').popover()

$('[ks-select2-ajax]').select2
  ajax:
    url: '/json/similar.json'
    dataType: 'json'
    delay: 250
    results: (data) ->
      return results: data.items
  formatResult: (e) ->
    return '' +
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

$('[products-categories-tree]').jstree()