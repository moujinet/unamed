<script lang="ts" setup>
defineProps<{
  content?: string
  icon?: string
  visible?: boolean
  closeable?: boolean
}>()

defineEmits(['close'])
</script>

<template>
  <div v-if="visible" flex="~ v-center justify-between" p="x-4 y-3" bg="yellow-100" text="sm orange-400" rounded>
    <div flex="~ v-center gap-x-3">
      <CommonIcon v-if="icon" :name="icon" />
      {{ content }}
    </div>
    <CommonIcon v-if="closeable" name="i-ph-x" class="cursor-pointer" @click="$emit('close')" />
  </div>
</template>
