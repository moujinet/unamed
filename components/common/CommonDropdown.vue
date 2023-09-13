<script lang="ts" setup>
import { hideAllPoppers } from 'floating-vue'

defineProps<{
  title?: string
}>()
</script>

<template>
  <VDropdown placement="bottom-end" :positioning-disabled="isMobile">
    <slot name="trigger">
      <CommonIcon name="i-ph-dots-three" size="24" class="cursor-pointer" />
    </slot>
    <template #popper>
      <div flex="~ col gap-y-1" py="3">
        <div
          v-if="isMobile && title"
          text="caption center"
          font-bold
        >
          {{ title }}
        </div>

        <slot />

        <div v-if="isMobile" px="3" mt-2 pt-4 border="t base">
          <CommonButton type="plain" color="primary" size="lg" block @click="hideAllPoppers">
            {{ $t('common.actions.cancel') }}
          </CommonButton>
        </div>
      </div>
    </template>
  </VDropdown>
</template>
