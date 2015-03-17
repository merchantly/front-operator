addThousandsSeparator = (value, separator = '.') ->
  result = value

  while result != prevResult
    prevResult = result
    result = result.replace /^(-?\d+)(\d{3})/, "$1#{separator}$2"

  result

setDecimal = (value, mark = ',') ->
  value.replace /^(-?\d+)\.(\d+)/, "$1#{mark}$2"

window.MoneyHelpers =

  format: (cents, currency) ->
    symbolHtml         = currency.html_name
    symbolFirst        = currency.symbol_first
    subunitToUnit      = currency.subunit_to_unit
    thousandsSeparator = currency.thousands_separator
    decimalMark        = currency.decimal_mark
    exponent           = currency.exponent

    unit   = cents / subunitToUnit
    result = unit.toFixed exponent

    result = setDecimal result, decimalMark
    result = addThousandsSeparator result, thousandsSeparator

    result = if symbolFirst then symbolHtml + result else result + symbolHtml

    result