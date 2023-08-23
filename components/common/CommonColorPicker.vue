<script lang="ts" setup>
interface ColorOption {
  label: string
  value: string
}

defineProps<{
  options: ColorOption[]
}>()

const modelValue = defineModel<string>()

function handleColorSelected(value: string) {
  modelValue.value = value
}
</script>

<template>
  <div flex="~ v-center gap-x-8">
    <div
      v-for="option in options"
      :key="option.value"
      :class="modelValue === option.value ? 'ring-2 ring-offset-4 ring-primary ring-offset-dark' : ''"
      :style="{ backgroundColor: `rgb(${option.value})` }"
      h-8 w-8 rounded-full
      @click="handleColorSelected(option.value)"
    />
  </div>
</template>
