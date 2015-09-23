const NoticeService = {
  notify(type, text) {
    toastr[type](text);
  },

  notifyInfo(text) {
    this.notify('info', text);
  },

  notifyError(text) {
    this.notify('error', text);
  },

  notifySuccess(text) {
    this.notify('success', text);
  },

  errorResponse(response) {
    function isPageLoadingCanceled(response) {
      // Вернет true, если во время запроса пользователь:
      // - Остановил загрузку страницы
      // - Перешёл на другую страницу
      return response.statusText === 'error' && response.status == 0 && response.readyState == 0;
    }

    if (isPageLoadingCanceled(response) || response.statusText === 'abort') {
      return false;
    }

    let message = '';
    if (response.responseJSON != null) {
      let { responseJSON: json } = response;
      message = json.message || json.long_message || json.error;
    } else {
      message = 'Ошибка сети: ' + response.statusText;
    }

    this.notifyError(message);
  }
};

export default NoticeService;