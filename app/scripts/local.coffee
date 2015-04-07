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

$('[data-toggle="tooltip"]').tooltip()
$('[data-toggle="popover"]').popover()