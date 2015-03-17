window.gon =
  #fallback_product_thumb_url: "assets/product-50x50-1.jpg"
 fallback_product_thumb_url: 'assets/product-none.png'

 # localStorage.setItem('root_url', 'http://kaskad.3001.vkontraste.ru')
 root_url: localStorage.getItem('root_url') || ''

 # localStorage.setItem('operator_api_url', 'http://kaskad.3001.vkontraste.ru/operator/api')
 operator_api_url: localStorage.getItem('operator_api_url') || ''

 # Если null значит брать напрямую
 thumbor_url: 'http://thumball.brandydev.ru'
 thumbor_secret: null
