<script lang="ts" setup>
// const { isLoggedIn } = useSession()
</script>

<template>
  <nav v-if="isHydrated" flex="~ col gap-y-2" lt-lg:px-3>
    <NavSiderItem :title="$t('nav.sider.bookmarks')" icon="i-ph-bookmarks" to="/bookmarks" />
    <div />
    <NavSiderItem :title="$t('nav.sider.collections')" icon="i-ph-stack" to="/collections" />
    <!-- <NavSiderItem  :title="$t('nav.sider.tags')" icon="i-ph-hash" to="/tags" /> -->
    <div />
    <NavSiderItem :title="$t('nav.sider.settings')" icon="i-ph-gear-six" to="/settings" />
  </nav>
</template>
