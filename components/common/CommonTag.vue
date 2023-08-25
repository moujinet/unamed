<script lang="ts" setup>
defineProps<{
  label?: string
  closeable?: boolean
}>()

defineEmits(['close'])
</script>

<template>
  <span flex="~ v-center gap-x-1" p="x-2 y-1" bg-main text-12px>
    {{ label }}
    <CommonIcon v-if="closeable" name="i-ph-x" size="16" class="hover:text-caption" @click="$emit('close', label)" />
  </span>
</template>
