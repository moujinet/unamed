<script lang="ts" setup>
interface CellOptions {
  label: string
  icon?: string
  to?: string
  value?: string
  arrow?: boolean
  underline?: boolean
  clickable?: boolean
}

defineProps<{
  name?: string
  cells?: CellOptions[]
}>()
</script>

<template>
  <div
    flex="~ col"
    p="t-5"
    gap-y-2
  >
    <h3
      v-if="name"
      text="comment 3"
      p="x-5 y-2"
      select-none leading-none uppercase
    >
      {{ name }}
    </h3>
    <slot>
      <template v-for="(cell, index) in cells" :key="index">
        <CommonCell
          :label="cell.label"
          :icon="cell.icon"
          :to="cell.to"
          :value="cell.value"
          :arrow="cell.arrow"
          :underline="cell.underline"
          :clickable="cell.clickable"
        />
      </template>
    </slot>
  </div>
</template>
