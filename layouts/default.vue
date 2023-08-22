<script lang="ts" setup>
const route = useRoute()

const isRootPage = computed(() => {
  return route.fullPath.split('/').length === 2
})

const showNav = computed(() => {
  if (isRootPage.value)
    return true
  return !isMobile.value
})

const showContent = computed(() => {
  if (isMobile.value)
    return !isRootPage.value || route.fullPath === '/'
  return true
})
</script>

<template>
  <div min-h-full flex>
    <aside class="hidden sm:block" w="68px lg:260px" fixed top-0 z-10 h-full bg-sider transition-width>
      <div
        flex="~ col gap-y-6"
        p="lg:x-6 y-5"
        border="r base"
        overflow="x-hidden y-auto"
        max-w-full min-h-full
      >
        <NavTitle />

        <NavSider />

        <div lt-lg:px-3>
          <CommonTooltip content="New Collection" placement="right">
            <CommonButton color="primary" type="solid" size="lg" class="lt-lg:py-2.5!" icon="i-ph-plus" dashed block>
              New Collection
            </CommonButton>
          </CommonTooltip>
        </div>
      </div>

      <div v-if="isHydrated" sticky bottom-0 z-10 w-full>
        <!-- <UserWelcome /> -->
        <UserAvatar />
      </div>
    </aside>
    <main ml="sm:68px lg:260px" w="full sm:[calc(100%-68px)] lg:[calc(100%-260px)]">
      <div h-full flex transition-width>
        <div v-if="$slots.inner && showNav" w="full md:300px" border="r base" fixed top-0 h-full bg-main>
          <slot name="inner" />
        </div>
        <div
          :class="[
            showContent ? '' : 'hidden',
            $slots.inner ? 'md:w-[calc(100%-300px)] md:ml-300px' : 'w-full',
          ]"
          bg-main
        >
          <NuxtPage />
          <NavBottom v-if="isMobile && isHydrated" />
        </div>
      </div>
    </main>
  </div>
</template>
