<script lang="ts" setup>
defineProps<{
  title: string
  icon: string
  to?: string
}>()
</script>

<template>
  <CommonTooltip :content="title" placement="right">
    <NuxtLink class="nav" active-class="nav-active" :to="to">
      <CommonIcon :name="icon" size="18" />
      <span v-if="!isSmaller && isHydrated">{{ title }}</span>
    </NuxtLink>
  </CommonTooltip>
</template>

<style scoped>
.nav {
  --at-apply: text-(4 caption) flex-(~ v-center gap-x-2.5) p-(x-4 y-3) lt-lg:(flex-center px-0) hover:text-primary rounded leading-none;

  &-active {
    --at-apply: text-light bg-primary/90 hover:text-light;
  }
}
</style>
