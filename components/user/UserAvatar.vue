<script lang="ts" setup>
withDefaults(defineProps<{
  auto?: boolean
}>(), {
  auto: true,
})
</script>

<template>
  <div
    :class="auto ? 'lt-lg:flex-col-reverse' : ''"
    flex="~ v-center justify-between gap-y-8"
    p="lg:x-6 y-5"
    select-none
  >
    <NuxtLink
      flex="~ v-center gap-x-4"
      to="/user"
    >
      <div
        class="h-42px w-42px rounded-full leading-none"
        flex="~ center"
        ring="3 primary"
      >
        <NuxtImg src="https://placekitten.com/42/42" preset="avatar" loading="lazy" class="rounded-full" />
      </div>
      <div
        :class="auto ? 'hidden lg:block' : ''"
      >
        <h3 text="caption 16px">
          Allen Luo
        </h3>
        <span text="comment 13px">Administrator</span>
      </div>
    </NuxtLink>
    <slot>
      <NuxtLink to="/user" hover:text-primary>
        <CommonIcon name="i-ph-sliders-horizontal" size="20" />
      </NuxtLink>
    </slot>
  </div>
</template>
