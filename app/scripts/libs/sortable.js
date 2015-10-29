import Sortable from 'sortablejs';

function onStart({ item }) {
  $(item)
    .children()
    .each(function(index) {
      $(this).width($(this).width());
    });
}

function onUpdate({ item, newIndex }) {
  const $item = $(item).find('[data-sort-url]');
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

$.fn.sortableJS = function (options) {
  var retVal;
  var args = arguments;

  this.each(function () {
    var $el = $(this);
    var sortable = $el.data('sortable');

    if (!sortable && (options instanceof Object || !options)) {
      sortable = new Sortable(this, options);
      $el.data('sortable', sortable);
    }

    if (sortable) {
      if (options === 'widget') {
        return sortable;
      } else if (options === 'destroy') {
        sortable.destroy();
        $el.removeData('sortable');
      } else if (typeof sortable[options] === 'function') {
        retVal = sortable[options].apply(sortable, [].slice.call(args, 1));
      } else if (options in sortable.options) {
        retVal = sortable.option.apply(sortable, args);
      }
    }
  });

  return (retVal === void 0) ? this : retVal;
};

$.fn.operatorSortable = function(options) {
  this.sortableJS({
    onStart,
    onUpdate,
    ghostClass: 'ui-state-highlight',
    animation: 150,
    forceFallback: true,
    ...options,
  });
};

$.fn.operatorTableSortable = function(options) {
  this.sortableJS({
    onStart,
    onUpdate,
    handle: '.handle',
    ghostClass: 'ui-state-highlight',
    animation: 150,
    forceFallback: true,
    ...options
  });
};