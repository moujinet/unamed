<script lang="ts" setup>
import type { IOption } from '~/types'

defineProps<{
  options: IOption<string>[]
  mini?: boolean
  bordered?: boolean
  block?: boolean
}>()

const modelValue = defineModel<string>()
</script>

<template>
  <div
    flex="~ v-center"
    :class="{
      'gap-x-2': mini,
      'gap-x-4': !mini,
      'w-full': block,
    }"
  >
    <div
      v-for="({ icon, label, value }, index) in options"
      :key="index"
      class="select-none rounded"
      :class="{
        'p-1': mini,
        'border-(1 base)': bordered,
        'flex-(~ auto center gap-x-3) py-14px': block,
        'flex-(~ v-center gap-x-3) p-(x-20px y-14px)': !mini && !block,
        'text-primary': modelValue === value,
        'bg-inset': mini && modelValue === value,
        'ring-(1 primary)': bordered && modelValue === value,
      }"
      @click="modelValue = value"
    >
      <div v-if="icon" flex="~ center" leading-none>
        <CommonIcon :name="icon" :size="mini ? '16' : '20'" />
      </div>
      <span v-if="!mini && label">{{ $t(label) }}</span>
    </div>
  </div>
</template>
