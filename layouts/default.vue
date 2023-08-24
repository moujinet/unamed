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
          <CommonTooltip content="New Collection" placement="right" :disabled="isDesktop">
            <CommonButton color="primary" type="solid" size="lg" class="lt-lg:py-2.5!" icon="i-ph-plus" dashed block>
              New Collection
            </CommonButton>
          </CommonTooltip>
        </div>
      </div>

      <div v-if="isHydrated" sticky bottom-0 z-10 w-full>
        <!-- <UserWelcome /> -->
        <UserInfo />
      </div>
    </aside>
    <main ml="sm:68px lg:260px" w="full sm:[calc(100%-68px)] lg:[calc(100%-260px)]">
      <slot />
      <NavBottom v-if="isMobile && isHydrated" />
    </main>
  </div>
</template>
