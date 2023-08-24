<script lang="ts" setup>
const { showNav, showContent } = useSplitView('settings')
</script>

<template>
  <div h-full flex transition-all>
    <div
      v-show="isHydrated && showNav"
      :class="isMobile ? 'w-full' : 'w-[calc(100%-68px)] md:w-280px border-(r base)'"
      fixed top-0 z-10 h-full bg-main
    >
      <slot />
    </div>
    <div
      v-show="isHydrated && showContent"
      class="w-full md:ml-280px md:w-[calc(100%-280px)]"
      bg-main
    >
      <NuxtPage />
    </div>
  </div>
</template>
