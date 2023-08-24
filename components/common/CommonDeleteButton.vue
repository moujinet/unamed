<script lang="ts" setup>
import { hideAllPoppers } from 'floating-vue'

const props = withDefaults(defineProps<{
  popperIcon?: string
  popperText?: string
  confirmText?: string
  cancelText?: string
  popperColor?: 'primary' | 'danger'
  onConfirm?: () => Promise<void>
  onCancel?: () => void
}>(), {
  popperIcon: 'i-ph-trash',
  popperText: 'Are you sure you want to delete?',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  popperColor: 'danger',
})

function handleCancel() {
  props.onCancel?.()
  hideAllPoppers()
}

function handleConfirm() {
  props.onConfirm?.().then(() => {
    hideAllPoppers()
  })
}
</script>

<template>
  <VDropdown placement="top" :positioning-disabled="isMobile">
    <CommonButton v-bind="$attrs">
      <slot />
    </CommonButton>

    <template #popper>
      <div flex="~ col gap-y-6" p-6>
        <div flex="~ v-center gap-x-3">
          <CommonIcon :name="popperIcon" size="20" :class="`is-${popperColor}`" />
          <span select-none text="4 caption">{{ popperText }}</span>
        </div>
        <div flex="~ justify-end v-center gap-x-4">
          <CommonButton :size="isMobile ? 'md' : 'sm'" :block="isMobile" @click="handleCancel">
            {{ cancelText }}
          </CommonButton>
          <CommonButton :size="isMobile ? 'md' : 'sm'" :color="popperColor" :block="isMobile" @click="handleConfirm">
            {{ confirmText }}
          </CommonButton>
        </div>
      </div>
    </template>
  </VDropdown>
</template>

<style scoped>
.is-primary {
  --at-apply: text-primary;
}
.is-danger {
  --at-apply: text-danger;
}
</style>
