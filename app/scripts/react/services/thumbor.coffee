window.ThumborService =

  image_url: (url, style='100x100') ->
    fallbackImageUrl = encodeURIComponent gon?.fallback_product_thumb_url
    thumborUrl       = gon?.thumbor_url

    if url? && url != ''
      if @isExternalImage url
        escapedImageUrl  = encodeURIComponent url

        imageUrl = thumborUrl + "/unsafe/#{style}/" + escapedImageUrl
      else
        imageUrl = url
    else
      imageUrl = thumborUrl + "/unsafe/#{style}/" + fallbackImageUrl

    imageUrl

  isExternalImage: (url) ->
    externalImageMatcher = new RegExp '^http'
    externalImageMatcher.test url