// Here we listen globally emitted update events and reinit some libs

$(document).on('ready attributes:update', function() {
  $('[data-toggle="popover"]').popover();
  $('.input-group.date').datetimepicker({ format: 'YYYY-MM-DDTHH:mm:ssZ' });
});

$(document).on('ready', function() {
  $('.handle').closest('tbody').operatorTableSortable({
    forceFallback: true,
    ghostClass: 'row--highlight',
  });
  $('.handle').closest('.products-blocks').operatorTableSortable({
    forceFallback: false,
    ghostClass: 'card--highlight',
  });
});