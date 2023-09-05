<template>
  <article rounded bg-card>
    <slot />
    <div v-if="$slots.footer" flex="~ v-center justify-between" gap-x-4 p="x-4 y-3" border="t base" leading-none>
      <slot name="footer" />
    </div>
  </article>
</template>
