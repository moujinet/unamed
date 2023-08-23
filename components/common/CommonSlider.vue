<script lang="ts" setup>
defineProps<{
  options: string[]
}>()

const emit = defineEmits(['change'])

const modelValue = defineModel<string>()

function handleSliderChange(value: string) {
  modelValue.value = value
  emit('change', value)
}
</script>

<template>
  <div flex="~ v-center justify-between gap-x-4">
    <slot name="prepend" />
    <div relative h-6 w-full>
      <div flex="~ v-center justify-between" absolute z-10 w-full>
        <div
          v-for="option in options"
          :key="option"
          :class="modelValue === option ? 'h-6 w-6 bg-primary' : 'h-4 w-4 bg-inset'"
          cursor-pointer rounded-full
          @click="handleSliderChange(option)"
        />
      </div>
      <div absolute="~ center" h-4px w-full bg-inset />
    </div>
    <slot name="append" />
  </div>
</template>
