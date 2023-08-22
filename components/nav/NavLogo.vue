<script setup lang="ts">
withDefaults(defineProps<{
  size?: string
}>(), {
  size: '24',
})
</script>

<template>
  <span aspect="1/1">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aspect="1/1" fill="none" version="1.1" :width="size" :height="size" viewBox="0 0 512 512">
      <defs>
        <clipPath id="logo">
          <rect x="0" y="0" width="512" height="512" rx="0" />
        </clipPath>
      </defs>
      <g clip-path="url(#logo)">
        <g>
          <path class="logo" d="M0,512L238.933,512L238.933,238.933C238.933,106.974,131.959,0,0,0L0,512ZM273.067,512C405.026,512,512,405.026,512,273.067L512,0C380.041,0,273.067,106.974,273.067,238.933L273.067,512Z" />
        </g>
      </g>
    </svg>
  </span>
</template>

<style scoped>
svg path.logo {
  --at-apply: fill-primary;
}
</style>
