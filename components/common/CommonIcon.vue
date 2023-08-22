<script lang="ts" setup>
withDefaults(defineProps<{
  name?: string
  size?: '16' | '18' | '20' | '24' | '42' | 'auto'
}>(), {
  size: '16',
})
</script>

<template>
  <i
    class="leading-none"
    :class="{
      [`${name}`]: name,
      'text-16px': size === '16',
      'text-18px': size === '18',
      'text-20px': size === '20',
      'text-24px': size === '24',
      'text-42px': size === '42',
    }"
  />
</template>
