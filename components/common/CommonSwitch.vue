<script lang="ts" setup>
const modelValue = defineModel<boolean>()

function handleToggle() {
  modelValue.value = !modelValue.value
}
</script>

<template>
  <div
    :class="modelValue ? 'justify-end' : 'justify-start'"
    class="bg-inset hover:op-80"
    w-54px flex rounded-full p-4px
    @click="handleToggle"
  >
    <div
      :class="modelValue ? 'bg-primary' : 'bg-light'"
      h-20px w-20px rounded-full
    />
  </div>
</template>
