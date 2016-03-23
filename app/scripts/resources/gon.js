global.gon = {
  operator: {
    id: 17,
    name: 'yagr',
    authentications: [],
    api_key: {
      access_token: '3cd8350b5229f08ecc12416c89c2be39',
      user_id: 17,
      expires_at: '2015-01-10T11:22:34.000+04:00'
    }
  },
  vendor_key: localStorage.getItem('vendor_key') || 'test',
  fallback_product_thumb_url: 'assets/product-none.png',
  root_url: localStorage.getItem('root_url') || '',
  operator_api_url: localStorage.getItem('operator_api_url') || '',
  thumbor_url: 'http://thumbor.kiiiosk.ru',
  thumbor_secret: null
};

export default gon;
