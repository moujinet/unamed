<script lang="ts" setup>
const modelValue = defineModel<string>()

function handleToggle() {
  modelValue.value = modelValue.value === '0' ? '1' : '0'
}
</script>

<template>
  <div
    :class="modelValue === '1' ? 'justify-end' : 'justify-start'"
    class="bg-inset hover:op-80"
    w-54px flex rounded-full p-4px
    @click="handleToggle"
  >
    <div
      :class="modelValue === '1' ? 'bg-primary' : 'bg-light'"
      h-20px w-20px rounded-full
    />
  </div>
</template>
