import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Unamed',
  titleTemplate: ':title - Unamed',
  description: 'Unamed - A lightweight, self-hosted bookmarking web service.',

  srcDir: 'src',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  cleanUrls: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/logo.svg', width: 20, height: 20 },

    nav: [
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '^/guide/' },
      { text: 'Reference', link: '/reference/api/', activeMatch: '^/reference/' },
    ],

    sidebar: {
      '/guide': [
        {
          text: 'Introduction',
          collapsed: true,
          items: [
            { text: 'What is Unamed', link: '/guide/what-is-unamed' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Changelogs', link: '/guide/changelogs' },
          ],
        },
        {
          text: 'Installation',
          collapsed: true,
          items: [
            { text: 'Install from source', link: '/guide/install-from-source-code' },
            { text: 'Install with Docker', link: '/guide/install-with-docker' },
            { text: 'Install on Cloud Provider', link: '/guide/install-on-cloud-provider' },
          ],
        },
      ],
      '/reference': [
        { text: 'Overview', link: '/reference/api/' },
        {
          text: 'API Reference',
          items: [
            {
              text: 'Bookmark',
              collapsed: true,
              items: [
                { text: 'Fetch all bookmarks', link: '/reference/api/bookmark/fetch-all-bookmarks' },
                { text: 'Fetch details of a bookmark', link: '/reference/api/bookmark/fetch-details-of-a-bookmark' },
                { text: 'Fetch metadata of a bookmark', link: '/reference/api/bookmark/fetch-metadata-of-a-bookmark' },
                { text: 'Create a new bookmark', link: '/reference/api/bookmark/create-a-new-bookmark' },
                { text: 'Update a bookmark', link: '/reference/api/bookmark/update-a-bookmark' },
                { text: 'Delete a bookmark', link: '/reference/api/bookmark/delete-a-bookmark' },
              ],
            },
            {
              text: 'Collection',
              collapsed: true,
              items: [
                { text: 'Fetch all collections', link: '/reference/api/collection/fetch-all-collections' },
                { text: 'Fetch details of a collection', link: '/reference/api/collection/fetch-details-of-a-collection' },
                { text: 'Create a new collection', link: '/reference/api/collection/create-a-new-collection' },
                { text: 'Update a collection', link: '/reference/api/collection/update-a-collection' },
                { text: 'Delete a collection', link: '/reference/api/collection/delete-a-collection' },
              ],
            },
            {
              text: 'Tag',
              collapsed: true,
              items: [
                { text: 'Search tags by keyword', link: '/reference/api/tag/search-tags-by-keyword' },
                { text: 'Fetch all tags', link: '/reference/api/tag/fetch-all-tags' },
                { text: 'Fetch details of a tag', link: '/reference/api/tag/fetch-details-of-a-tag' },
                { text: 'Create a new tag', link: '/reference/api/tag/create-a-new-tag' },
                { text: 'Update a tag', link: '/reference/api/tag/update-a-tag' },
                { text: 'Delete a tag', link: '/reference/api/tag/delete-a-tag' },
              ],
            },
            {
              text: 'User',
              collapsed: true,
              items: [
                { text: 'Register a new user', link: '/reference/api/user/register' },
                { text: 'Login user', link: '/reference/api/user/login' },
                { text: 'Logout a logged-in user', link: '/reference/api/user/logout' },
                { text: 'Fetch profile of current user', link: '/reference/api/user/fetch-profile-of-current-user' },
                { text: 'Update profile of current user', link: '/reference/api/user/update-profile-of-current-user' },
                { text: 'Update avatar of current user', link: '/reference/api/user/update-avatar-of-current-user' },
                { text: 'Change password of current user', link: '/reference/api/user/change-password-of-current-user' },
                { text: 'Upload avatar image', link: '/reference/api/user/upload-avatar-image' },
              ],
            },
          ],
        },
        {
          text: 'Schemas',
          items: [
            { text: 'Database Schema', link: '/reference/schemas/database-schema' },
            { text: 'Error Codes', link: '/reference/schemas/error-codes' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/moujinet/unamed' },
    ],

    footer: {
      copyright: `Copyright &copy; 2022-${new Date().getFullYear()} Mouji.net All Rights Reserved.`,
    },

  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
    },

    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Number.POSITIVE_INFINITY,
    },

    json: {
      stringify: true,
    },

    plugins: [
      UnoCSS(),
    ],
  },
})
