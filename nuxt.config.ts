import { isDevelopment } from 'std-env'

export default defineNuxtConfig({
  app: {
    keepalive: true,
    rootId: 'app',
    head: {
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        {
          name: 'description',
          content: 'A lightweight, self-hosted bookmarking web service.',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        { property: 'og:title', content: 'unamed' },
        {
          property: 'og:description',
          content: 'A lightweight, self-hosted bookmarking web service.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/unamed-og.png' },
        { property: 'og:image:width', content: '3800' },
        { property: 'og:image:height', content: '1900' },
        { property: 'og:site_name', content: 'unamed' },
        { property: 'twitter:site', content: '@moujinet' },
        { property: 'twitter:title', content: 'unamed' },
        { property: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },

  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxt/image',
    '@morev/vue-transitions/nuxt',
    'stale-dep/nuxt',
  ],

  vue: {
    defineModel: true,
  },

  imports: {
    dirs: [
      './services',
    ],
    injectAtEnd: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    'floating-vue/dist/style.css',
    '~/styles/vars.css',
    '~/styles/global.css',
    '~/styles/scrollbar.css',
    '~/styles/popper.css',
  ],

  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },

  colorMode: { classSuffix: '' },

  runtimeConfig: {
    session: {
      expires: 24 * 60 * 60, // 1d
    },
  },

  nitro: {
    experimental: {
      asyncContext: true,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: true,
    },
    publicAssets: [
      {
        dir: '~/public/fonts',
        maxAge: 24 * 60 * 60 * 365, // 1 year (versioned)
        baseURL: '/fonts',
      },
      {
        dir: '~/public/upload',
        maxAge: 24 * 60 * 60 * 365, // 1 year (versioned)
        baseURL: '/upload',
      },
    ],
  },

  image: {
    presets: {
      avatar: {
        modifiers: {
          fit: 'cover',
          format: 'png',
          width: 32,
          height: 32,
        },
      },
      favicon: {
        modifiers: {
          fit: 'cover',
          format: 'png',
          width: 42,
          height: 42,
        },
      },
    },
  },

  staleDep: {
    packageManager: 'pnpm',
  },

  devtools: { enabled: isDevelopment },

  sourcemap: isDevelopment,
})
