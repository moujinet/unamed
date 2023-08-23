<script lang="ts" setup>
const { showNav, showContent } = useSplitView('settings')
</script>

<template>
  <div h-full flex transition-all>
    <div
      v-if="showNav"
      :class="isMobile ? 'w-full' : 'w-[calc(100%-68px)] md:w-300px border-(r base)'"
      fixed top-0 z-10 h-full bg-main
    >
      <slot />
    </div>
    <div
      v-show="isHydrated && showContent"
      :class="[showNav ? 'md:ml-300px md:w-[calc(100%-300px)]' : 'w-full']"
      bg-main
    >
      <NuxtPage />
    </div>
  </div>
</template>
