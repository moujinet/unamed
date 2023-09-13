<script lang="ts" setup>
defineProps<{
  title?: string
  icon?: string
  view?: 'grid' | 'list'
  hiddenBack?: boolean
  autoHideHeader?: boolean
  collapsed?: boolean
  fixedWidth?: boolean
}>()

const { y } = useWindowScroll()
</script>

<template>
  <div :class="fixedWidth ? 'h-full w-full xl:w-700px xl:border-r border-base' : 'w-full'">
    <header
      v-if="isHydrated"
      sticky top-0 z-10 min-h-60px w-full select-none backdrop-blur transition-all
      :class="[
        y > 40 ? 'op-90' : '',
        autoHideHeader ? 'md:hidden lt-md:block' : '',
      ]"
    >
      <div p="x-5 y-5" relative min-h-60px leading-none>
        <NavBack v-if="!hiddenBack && isHydrated && isMobile" />
        <div absolute="lt-md:~ lt-md:center" flex="~ v-center gap-x-3">
          <div v-if="icon" p="0px md:11px" bg="lt-md:transparent md:sider" rounded>
            <CommonIcon :name="icon" size="auto" class="text-(20px primary) md:text-24px" />
          </div>
          <h1 text="caption 18px lg:20px" leading-none>
            <slot name="title">
              {{ title }}
            </slot>
          </h1>
        </div>
        <div v-if="$slots.header" absolute="~ v-center" right-8>
          <slot name="header" />
        </div>
      </div>
    </header>

    <div
      v-if="isHydrated"
      :class="[
        collapsed ? '' : 'px-6',
        isMobile ? 'pb-20' : 'pb-5',
      ]"
    >
      <slot name="prepend" />
      <div
        :class="{
          'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6': view === 'grid',
          'flex flex-col gap-y-6': view === 'list',
        }"
        py-2
      >
        <slot />
      </div>
      <slot name="footer" />
    </div>
  </div>
</template>
