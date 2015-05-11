$ ->
  # Подключение универсального модального окна
  modalClick = (event) ->
    event.stopPropagation()
    event.preventDefault()
    ModalService.show $(@).data 'modalUrl'

  bindActivities = ->
    $("[tooltip]").tooltip()
    $('[autosize]').autosize()

  $(document).on 'click', '[ks-modal]', modalClick

  bindActivities()
  $(document).on 'page:change', bindActivities

  productVariantsAdd = $('@products__new-form-variants-add')
  productVariantsTitle = $('@products__new-form-variants-title')
  productVariantsItem = $('@products__new-form-variants-item')
  productVariantsPlace = $('@products__new-form-variants-place')

  productVariantsAddBlock = $('@products__new-form-variants-add-block')
  productVariantsAddBlockBtn = $('@products__new-form-variants-add-block-btn')
  productVariantsBlock = $('@products__new-form-variants-block')
  productVariantTypeBtn = $('@products__new-form-variant-type-btn')
  productVariantTypeInput = $('@products__new-form-variant-type-input')
  productVariantTypeLabel = $('@products__new-form-variant-type-label')

  productVariantsBlock.hide()
  productVariantsAddBlockBtn.on 'click', (e) ->
    e.preventDefault()
    productVariantsAddBlock.hide()
    productVariantsBlock.show()

  productVariantTypeBtn.on 'click', (e) ->
    e.preventDefault()
    productVariantTypeBtn.removeClass 'active'
    $(@).addClass 'active'
    type = $(@).text()
    productVariantTypeLabel.text(type)

  productVariantTypeInput.on 'focus', () ->
    prevBtn = productVariantTypeBtn.filter('.active')
    productVariantTypeBtn.removeClass 'active'
    $(@).on 'blur', () ->
      unless $(@).val().length > 0
        prevBtn.addClass 'active'
        productVariantTypeLabel.text(prevBtn.text())


  productVariantTypeInput.on 'keypress', () ->
    if $(@).val().length > 0
      type = $(@).val()
      productVariantTypeLabel.text(type)

  productParamsAdd = $('@products__new-form-params-add')
  productParamsTitle = $('@products__new-form-params-title')
  productParamsItem = $('@products__new-form-params-item')
  productParamsPlace = $('@products__new-form-params-place')

  productFormQuantity = $('@products__new-form-quantity')
  productFormArticul = $('@products__new-form-articul')
  productFormImageAdd = $('@products__new-form-image-add')

  productVariantsTitle.hide()
  productVariantsPlace.hide()

  productVariantsAdd.on 'click', (e) ->
    e.preventDefault()
    productFormArticul.hide()
    productFormQuantity.hide()
    productVariantsTitle.show()
    productVariantsPlace.show()
    html = productVariantsItem.html()
    productVariantsPlace.append(html)

  productParamsTitle.hide()
  productParamsPlace.hide()

  productParamsAdd.on 'click', (e) ->
    e.preventDefault()
    productParamsTitle.show()
    productParamsPlace.show()
    html = productParamsItem.html()
    productParamsPlace.append(html)



  productFormImageAdd.on 'click', (e) ->
    e.preventDefault()
    $(@).toggleClass 'active'

  $('@jump').on 'click', (e) ->
    href = $(this).data('href')
    if href != ''
      if event.shiftKey || event.ctrlKey || event.metaKey
        window.open(target, '_blank')
      else
        window.location = href

  $('@jump .dropdown, @jump input').on 'click', (e) ->
    e.stopPropagation()

  # Скрыть/Показать категории
  categoriesList = $('@categories-list')
  switcherDisplayCategories = $('@switch-display-categories')
  switcherTitles =
    hide: switcherDisplayCategories.data('title-hide')
    show: switcherDisplayCategories.data('title-show')

  switcherDisplayCategories.on 'click', (e) ->
    e.preventDefault()
    if categoriesList.is(':visible')
      categoriesList.hide()
      $(@).text(switcherTitles.show)
    else
      categoriesList.show()
      $(@).text(switcherTitles.hide)

  # Демонстрация страницы авторизации
  authBox = $('@auth-box')
  authSectionToggle = $('@auth-section-toggle')
  authBack = $('@auth-back-btn')
  path = []
  prevSection = 'welcome'

  clearClasses = ->
    i = 0
    classNames = authBox.attr("class").split(/\s+/)

    while i < classNames.length
      className = classNames[i]
      authBox.removeClass className  if className.match(/^__\w+/)
      i++

    return

  authSectionToggle.on 'click', (e) ->
    e.preventDefault()

    path.push prevSection
    step = $(@).data('step')

    clearClasses()

    authBox.addClass('__' + step)
    prevSection = step

  authBack.on 'click', (e) ->
    console.log path.length
    if path.length is 0
      return false

    step = path.pop()

    prevSection = step

    clearClasses()

    authBox.addClass('__' + step)