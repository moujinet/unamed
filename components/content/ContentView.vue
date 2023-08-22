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
    <div p="x-5 md:x-8 y-5" relative leading-none>
      <NavBack v-if="isSmaller && isHydrated" />
      <div absolute="lt-lg:~ lt-lg:center" flex="~ v-center gap-x-3">
        <div v-if="icon" p="0px lg:11px" bg="lt-lg:transparent lg:sider" rounded>
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

  <div p="x-5 md:x-8">
    <div
      :class="{
        'grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6': view === 'grid',
      }"
    >
      <slot />
    </div>
  </div>
</template>
