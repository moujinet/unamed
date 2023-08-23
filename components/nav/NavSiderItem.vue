<script lang="ts" setup>
defineProps<{
  title: string
  icon: string
  to?: string
  disabled?: boolean
}>()
</script>

<template>
  <CommonTooltip :content="title" placement="right" :disabled="isDesktop">
    <NuxtLink class="nav" :class="[disabled ? 'is-disabled' : '']" active-class="is-active" :to="!disabled ? to : ''">
      <CommonIcon class="nav__icon" :name="icon" size="18" />
      <span v-if="isDesktop && isHydrated">{{ title }}</span>
    </NuxtLink>
  </CommonTooltip>
</template>

<style scoped>
.nav {
  --at-apply: text-(4 caption) flex-(~ v-center gap-x-2.5) p-(x-4 y-3) lt-lg:(flex-center px-0) rounded leading-none select-none;

  &:hover {
    --at-apply: text-primary;

    .nav__icon {
      --at-apply: text-primary;
    }
  }

  &__icon {
    --at-apply: text-base;
  }

  &.is-active {
    --at-apply: text-light bg-primary/90 hover:text-light;

    & .nav__icon {
      --at-apply: text-light;
    }
  }

  &.is-disabled {
    --at-apply: text-comment hover:text-comment;
  }
}
</style>
