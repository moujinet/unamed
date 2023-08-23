import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  theme: {
    colors: {
      primary: 'rgba(var(--c-primary), <alpha-value>)',
      danger: 'rgba(var(--c-danger), <alpha-value>)',
    },
  },
  shortcuts: [
    {
      // background
      'bg-main': 'bg-$c-bg-base',
      'bg-sider': 'bg-$c-bg-sider',
      'bg-inset': 'bg-$c-bg-inset',
      'bg-inset-hover': 'bg-$c-bg-inset-hover',
      'bg-inset-active': 'bg-$c-bg-inset-active',

      // text
      'text-base': 'text-$c-text-base',
      'text-caption': 'text-$c-text-caption',
      'text-comment': 'text-$c-text-comment',
      'text-light': 'text-$c-text-light',

      // border
      'border-base': 'border-$c-border-base',
      'border-hover': 'border-$c-border-hover',
      'border-active': 'border-$c-border-active',

      // card
      'bg-card': 'bg-$c-bg-card',
      'border-card': 'border-$c-border-card',

      // utils
      'flex-center': 'items-center justify-center',
      'flex-v-center': 'items-center',
      'flex-h-center': 'justify-center',
      'absolute-center': 'left-50% top-50% translate-x--1/2 translate-y--1/2',
      'absolute-v-center': 'top-50% translate-y--1/2',
      'absolute-h-center': 'left-50% translate-x--1/2',
    },
  ],
  presets: [
    presetUno({
      attributifyPseudo: true,
    }),
    presetAttributify(),
    presetRemToPx(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'line-height': '1',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Inter',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
