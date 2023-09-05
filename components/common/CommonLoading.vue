<script lang="ts" setup>
defineProps<{
  loading?: boolean
  text?: string
}>()
</script>

<template>
  <div v-if="loading" flex="~ center gap-x-3">
    <CommonIcon name="i-svg-spinners-90-ring-with-bg" size="20" class="text-primary" />
    <span select-none text-comment>
      <slot>
        {{ text ? text : 'Loading more...' }}
      </slot>
    </span>
  </div>
</template>
