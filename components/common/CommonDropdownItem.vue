<script lang="ts" setup>
withDefaults(defineProps<{
  label: string
  icon: string
  danger?: boolean
  link?: boolean
}>(), {
  link: true,
})
</script>

<template>
  <div
    :class="{
      'cursor-pointer hover:bg-inset': link || danger,
      'select-none text-comment': !link,
      'active:text-primary hover:text-primary': link,
      'text-danger active:text-danger hover:text-danger': danger,
    }"
    flex="~ v-center gap-x-3"
    p="l-4 r-8 y-2 lt-sm:y-3"
  >
    <CommonIcon :name="icon" />
    {{ label }}
  </div>
</template>
