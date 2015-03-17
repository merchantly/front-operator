window.AppHelpers =

  # Ставит фокус на input и выделяет содержимое
  reselectAndFocus: (node) ->
    value       = node.value
    valueLength = value.length

    node.focus()
    if node.setSelectionRange?
      node.setSelectionRange 0, valueLength
    else
      node.value = value