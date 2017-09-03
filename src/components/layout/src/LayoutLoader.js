import $ from 'jquery'

export default {
  load (srcPath = 'http://layout.jquery-dev.com/lib/js/jquery.layout-latest.js', callback) {
    if ($.layout) {
      callback()
      return
    }

    window.LOADER_CALLBACKS = window.LOADER_CALLBACKS || []
    window.LOADER_CALLBACKS.push(callback)
    if (window.LOADER_PENDING) {
      return
    } else {
      const $script = window.document.createElement('script')
      $script.type = 'text/javascript'
      $script.src = srcPath
      $script.addEventListener('load', () => {
        window.LOADER_PENDING = false
        window.LOADER_CALLBACKS.forEach(callback => {
          callback()
        })
      })
      window.document.body.appendChild($script)
      window.LOADER_PENDING = true
    }
  }
}
