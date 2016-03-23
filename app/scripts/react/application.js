global.KioskOperatorApp = {
  start({ vendor_key, operator, access_key }) {
    console.log(`KioskOperatorApp start for vendor: ${vendor_key}, operator: ${operator.name}`);

    $.ajaxSetup({
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      headers: {
        'X-Vendor-Key': vendor_key,
        'X-Operator-Id': operator.id,
        'X-Access-Key': access_key
      }
    });

    window.EB.emit('start');
  },

  error_alert(message) {
    alert(message);
  }
};
