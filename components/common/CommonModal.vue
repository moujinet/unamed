<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title?: string
  icon?: string
  okText?: string
  okButtonColor?: 'primary' | 'danger'
  cancelText?: string
  underline?: 'none' | 'both' | 'header' | 'footer'
  target?: '#main' | 'body'
  loading?: boolean
  closeable?: boolean
  header?: boolean
  footer?: boolean
}>(), {
  okText: 'OK',
  okButtonColor: 'primary',
  cancelText: 'Cancel',
  underline: 'both',
  header: true,
  footer: true,
  closeable: true,
  target: '#main',
})

const emit = defineEmits(['ok', 'cancel', 'close'])
const visible = defineModel<boolean>('visible', { default: false })

watch(visible, (val) => {
  if (val) {
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
  }
  else {
    setTimeout(() => {
      document.getElementsByTagName('body')[0].style.overflowY = ''
    }, 350)
  }
})

function handleEvent(type: 'ok' | 'cancel' | 'close') {
  if (!props.loading && props.closeable) {
    if (type === 'cancel' || type === 'close')
      visible.value = false

    if (type === 'cancel') {
      emit('cancel')
      emit('close')
    }
    else {
      emit(type)
    }
  }
}
</script>

<template>
  <ClientOnly>
    <Teleport :to="target">
      <TransitionSlide :offset="[0, 20]">
        <div
          v-if="visible"
          class="absolute bottom-0 left-0 border border-card sm:bottom-auto sm:left-50% sm:top-50% sm:translate-x--1/2 sm:translate-y--1/2"
          z-110 w-full select-none rounded-t bg-card shadow-lg transition-all sm:w-500px sm:rounded
        >
          <header
            v-if="header && title"
            flex="~ v-center justify-between"
            p="x-6 y-4"
            :class="(underline === 'both' || underline === 'header') && 'border-(b-1 base)'"
          >
            <div flex="~ v-center" gap-x-4 leading-none text-caption>
              <slot name="header">
                <CommonIcon v-if="icon" :name="icon" size="24" />
                <strong text-4.5 font-semibold>{{ title }}</strong>
              </slot>
            </div>
            <CommonButton v-if="closeable && !loading" icon="i-ph-x" shape="circle" size="sm" @click="handleEvent('close')" />
          </header>

          <main p="x-6 y-4">
            <slot />
          </main>

          <footer
            v-if="footer"
            flex="~ v-center justify-end lt-sm:justify-around gap-x-3"
            p="x-6 y-4"
            :class="(underline === 'both' || underline === 'footer') && 'border-(t-1 base)'"
          >
            <slot name="footer">
              <CommonButton class="lt-sm:(w-full py-4!)" :auto="false" :disabled="loading" @click="handleEvent('cancel')">
                {{ cancelText }}
              </CommonButton>
              <CommonButton class="lt-sm:(w-full py-4!)" :auto="false" :color="okButtonColor" :loading="loading" @click="handleEvent('ok')">
                {{ okText }}
              </CommonButton>
            </slot>
          </footer>
        </div>
      </TransitionSlide>
    </Teleport>

    <Teleport to="body">
      <CommonMask v-if="visible" @click="handleEvent('close')" />
    </Teleport>
  </ClientOnly>
</template>
