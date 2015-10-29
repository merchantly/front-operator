import Sortable from 'sortablejs';

function onStart({ item }) {
  $(item)
    .children()
    .each(function(index) {
      $(this).width($(this).width());
    });
}

function onUpdate({ item, newIndex }) {
  const $item = $(item);
  const url = $item.data('sort-url');

  if (url) {
    const method = $item.data('data-sort-post') || 'POST';
    const position = $item.data('data-sort-position') || newIndex + 1;
    const onSuccess = $item.data('sort-success-action');
    let customParams = $item.data('sort-custom-params') || {};

    if (typeof customParams === 'string') {
      customParams = JSON.parse(customParams);
    }

    $.ajax({
      url,
      method,
      data: {...customParams, position},
    }).then(() => {
      if (onSuccess !== 'nothing') {
        window.location.reload();
      }
    }).fail(() => {
      alert('Error when saving sorting');
    });
  }
}

export function operatorSortable(node) {
  Sortable.create(node, {
    onStart,
    onUpdate,
    ghostClass: 'ui-state-highlight',
    animation: 150,
    forceFallback: true,
  });
}

export function operatorTableSortable(node) {
  Sortable.create(node, {
    onStart,
    onUpdate,
    handle: '.handle',
    ghostClass: 'ui-state-highlight',
    animation: 150,
    forceFallback: true,
  });
}