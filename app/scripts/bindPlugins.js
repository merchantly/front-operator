// Here we listen globally emitted update events and reinit some libs

$(document).on('ready attributes:update', function() {
  $('[data-toggle="popover"]').popover();
  $('.input-group.date').datetimepicker({ format: 'YYYY-MM-DDTHH:mm:ssZ' });
});

$(document).on('ready', function() {
  $('.handle').closest('tbody').operatorTableSortable({
    forceFallback: true,
    onUpdate: null
  });
  $('.handle').closest('.products-blocks').operatorTableSortable({
    ghostClass: 'card--highlight',
    forceFallback: false,
  });
});

// # operatorTableSortable decalerd in static

// $ ->
//   # $('.handle').closest('ul').operatorTableSortable()
//   # $('.handle').closest('.list-group').operatorTableSortable()
//   $('.handle').closest('tbody').operatorTableSortable({
//     forceFallback: true,
//     # onUpdate: (evt) ->
//     #   console.log evt
//     #   console.log evt.dragged
//     #   console.log evt.draggedRect
//     #   console.log evt.related
//     #   console.log evt.relatedRect
//     #   true
//   })
//   $('.handle').closest('.products-blocks').operatorTableSortable({
//     ghostClass: 'card--highlight',
//     forceFallback: false,
//   })