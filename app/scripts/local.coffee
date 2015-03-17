# Here we can require local settings
require './local/gon'
require './dist'
require './local/routes'

mockOperator = require './data/operator.json'
console.log 'Залогинен оператор:', mockOperator

# Запиши сюда ключ вендора на проверяемом api
# test это реальный токен от вендора (3 kaskad) на 3001.vkontraste.ru
vendorKey = localStorage.getItem('vendor_key') || 'test'

KioskOperatorApp.start vendor_key: vendorKey, operator: mockOperator


# INSPINIA

# Custom scripts
# For demo purpose - animation css script

animationHover = (element, animation) ->
  element = $(element)
  element.hover (->
    element.addClass 'animated ' + animation
    return
  ), ->
    #wait for animation to finish before removing classes
    window.setTimeout (->
      element.removeClass 'animated ' + animation
      return
    ), 2000
    return
  return

SmoothlyMenu = ->
  if !$('body').hasClass('mini-navbar') or $('body').hasClass('body-small')
    # Hide menu in order to smoothly turn on when maximize menu
    $('#side-menu').hide()
    # For smoothly turn on menu
    setTimeout (->
      $('#side-menu').fadeIn 500
      return
    ), 100
  else if $('body').hasClass('fixed-sidebar')
    $('#side-menu').hide()
    setTimeout (->
      $('#side-menu').fadeIn 500
      return
    ), 300
  else
    # Remove all inline style from jquery fadeIn function to reset menu state
    $('#side-menu').removeAttr 'style'
  return

# Dragable panels

WinMove = ->
  element = '[class*=col]'
  handle = '.ibox-title'
  connect = '[class*=col]'
  $(element).sortable(
    handle: handle
    connectWith: connect
    tolerance: 'pointer'
    forcePlaceholderSize: true
    opacity: 0.8).disableSelection()

$ ->
  # MetsiMenu
  # Full height of sidebar

  fix_height = ->
    heightWithoutNavbar = $('body > #wrapper').height() - 61
    $('.sidebard-panel').css 'min-height', heightWithoutNavbar + 'px'

  $('#side-menu').metisMenu()
  # Collapse ibox function
  $('.collapse-link').click ->
    ibox = $(this).closest('div.ibox')
    button = $(this).find('i')
    content = ibox.find('div.ibox-content')
    content.slideToggle 200
    button.toggleClass('fa-chevron-up').toggleClass 'fa-chevron-down'
    ibox.toggleClass('').toggleClass 'border-bottom'
    setTimeout (->
      ibox.resize()
      ibox.find('[id^=map-]').resize()
    ), 50

  # Close ibox function
  $('.close-link').click ->
    content = $(this).closest('div.ibox')
    content.remove()

  # Small todo handler
  $('.check-link').click ->
    button = $(this).find('i')
    label = $(this).next('span')
    button.toggleClass('fa-check-square').toggleClass 'fa-square-o'
    label.toggleClass 'todo-completed'
    false

  # Append config box / Only for demo purpose
  $.get 'skin-config.html', (data) ->
    $('body').append data

  # minimalize menu
  $('.navbar-minimalize').click ->
    $('body').toggleClass 'mini-navbar'
    SmoothlyMenu()

  # tooltips
  $('.tooltip-demo').tooltip
    selector: '[data-toggle=tooltip]'
    container: 'body'

  # Move modal to body
  # Fix Bootstrap backdrop issu with animation.css
  $('.modal').appendTo 'body'
  fix_height()

  # Fixed Sidebar
  # unComment this only whe you have a fixed-sidebar
  #    $(window).bind("load", function() {
  #        if($("body").hasClass('fixed-sidebar')) {
  #            $('.sidebar-collapse').slimScroll({
  #                height: '100%',
  #                railOpacity: 0.9,
  #            });
  #        }
  #    })
  $(window).bind 'load resize click scroll', ->
    if !$('body').hasClass('body-small')
      fix_height()
  $('[data-toggle=popover]').popover()

# Minimalize menu when screen is less than 768px
$ ->
  $(window).bind 'load resize', ->
    if $(this).width() < 769
      $('body').addClass 'body-small'
    else
      $('body').removeClass 'body-small'

  $('[ks-select2]').select2()

$ ->
  simpleLoad = (btn, state) ->
    if state
      btn.children().addClass 'fa-spin'
      btn.contents().last().replaceWith ' Loading'
    else
      setTimeout (->
        btn.children().removeClass 'fa-spin'
        btn.contents().last().replaceWith ' Refresh'
      ), 2000

  $('#loading-example-btn').click ->
    btn = $(this)
    simpleLoad btn, true
    simpleLoad btn, false