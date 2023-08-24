<script lang="ts" setup>
const props = withDefaults(defineProps<{
  name: any
  size?: '16' | '18' | '20' | '24' | '42' | 'auto'
}>(), {
  size: '16',
})

const isCssIcon = computed(() => props.name.startsWith('i-'))
</script>

<template>
  <span
    class="leading-none"
    :class="{
      [`${name}`]: name,
      'text-16px': size === '16',
      'text-18px': size === '18',
      'text-20px': size === '20',
      'text-24px': size === '24',
      'text-42px': size === '42',
    }"
  >
    <i v-if="isCssIcon" :class="name" />
    <Icon v-else :name="name" />
  </span>
</template>
