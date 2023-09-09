// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import 'uno.css'
import './style.css'

import Api from './components/Api.vue'
import ApiAuth from './components/ApiAuth.vue'
import ApiParam from './components/ApiParam.vue'
import ApiSchema from './components/ApiSchema.vue'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.component('Api', Api)
    app.component('ApiAuth', ApiAuth)
    app.component('ApiParam', ApiParam)
    app.component('ApiSchema', ApiSchema)
  },
}
