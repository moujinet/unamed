<script lang="ts" setup>
import { hideAllPoppers } from 'floating-vue'

withDefaults(defineProps<{
  color?: 'primary' | 'danger'
  icon?: string
  question?: string
  confirmText?: string
  cancelText?: string
}>(), {
  color: 'primary',
  icon: 'i-ph-info',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
})
const emit = defineEmits(['cancel', 'confirm'])

function handleCancel() {
  emit('cancel')
  hideAllPoppers()
}

function handleConfirm() {
  emit('confirm')
  hideAllPoppers()
}
</script>

<template>
  <VDropdown placement="top" :positioning-disabled="isMobile">
    <slot />

    <template #popper>
      <div flex="~ col gap-y-6" p-6>
        <div flex="~ v-center gap-x-3">
          <CommonIcon :name="icon" size="20" :class="`is-${color}`" />
          <slot name="question">
            <span select-none text="4 caption">{{ question }}</span>
          </slot>
        </div>
        <div flex="~ justify-end v-center gap-x-4">
          <CommonButton :size="isMobile ? 'md' : 'sm'" :block="isMobile" @click="handleCancel">
            {{ cancelText }}
          </CommonButton>
          <CommonButton :size="isMobile ? 'md' : 'sm'" :color="color" :block="isMobile" @click="handleConfirm">
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
