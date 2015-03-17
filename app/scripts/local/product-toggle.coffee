$ ->
  productToggle = $('@product-toggle')
  productToggleSwitch = productToggle.find('input[type="checkbox"]')
  productToggleSwitch.on 'change', () ->
    toggleBlock = $(@).parents().filter('[role="product-toggle"]')
    toggleBlock.removeClass 'checked'
    if $(@).is(':checked')
      toggleBlock.addClass 'checked'



