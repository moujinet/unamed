<script lang="ts" setup>
const { isLoggedIn } = useSession()
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
      </div>

      <div v-if="isHydrated" sticky bottom-0 z-10 w-full>
        <UserInfo v-if="isLoggedIn" />
        <UserWelcome v-else />
      </div>
    </aside>
    <main id="main" relative ml="sm:68px lg:260px" w="full sm:[calc(100%-68px)] lg:[calc(100%-260px)]">
      <slot />
      <NavBottom v-if="isMobile && isHydrated" />
    </main>
  </div>
</template>
