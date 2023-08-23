<script lang="ts" setup>
withDefaults(defineProps<{
  icon?: string
  description?: string
}>(), {
  description: 'No data',
})
</script>

<template>
  <div h-full flex="~ col center" text-comment op-60>
    <CommonIcon :name="icon" size="42" />
    <div select-none py-3>
      <slot name="description">
        {{ description }}
      </slot>
    </div>
  </div>
</template>
