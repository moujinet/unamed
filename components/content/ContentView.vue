<script lang="ts" setup>
defineProps<{
  title: string
  icon?: string
  view?: 'grid' | 'list'
}>()

const { y } = useWindowScroll()
</script>

<template>
  <header sticky top-0 z-10 w-full select-none backdrop-blur transition-all :class="y > 40 ? 'op-90' : ''">
    <div p="x-5 y-5" relative leading-none>
      <NavBack v-if="isHydrated && isMobile" />
      <div absolute="lt-md:~ lt-md:center" flex="~ v-center gap-x-3">
        <div v-if="icon" p="0px md:11px" bg="lt-md:transparent md:sider" rounded>
          <CommonIcon :name="icon" size="auto" class="text-(20px primary) md:text-24px" />
        </div>
        <h1 text="caption 18px lg:20px" leading-none>
          {{ title }}
        </h1>
      </div>
      <div v-if="$slots.header" absolute="~ v-center" right-8>
        <slot name="header" />
      </div>
    </div>
  </header>

  <div p="x-5">
    <div
      :class="{
        'grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6': view === 'grid',
      }"
    >
      <slot />
    </div>
  </div>
</template>
