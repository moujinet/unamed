<script lang="ts" setup>
defineProps<{
  name?: string
  icon?: string
}>()
</script>

<template>
  <div flex="~ col gap-y-6" rounded bg-card p-6>
    <header v-if="name" flex="~ v-center gap-x-3">
      <CommonIcon v-if="icon" :name="icon" size="24" class="text-primary" />
      <h3 select-none font-semibold leading-none text="4 caption">
        {{ name }}
      </h3>
    </header>
    <slot />
  </div>
</template>
