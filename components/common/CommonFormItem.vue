<script lang="ts" setup>
defineProps<{
  label?: string
  required?: boolean
}>()
</script>

<template>
  <div flex="~ col" gap-y-3>
    <label v-if="label" select-none>
      {{ label }}
      <span v-if="required" text="14px danger">*</span>
    </label>
    <slot />
  </div>
</template>
