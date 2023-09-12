<script lang="ts" setup>
// const { isLoggedIn } = useSession()
</script>

<template>
  <nav flex="~ col gap-y-2" lt-lg:px-3>
    <NavSiderItem title="All Bookmarks" icon="i-ph-bookmarks" to="/bookmarks" />
    <div />
    <NavSiderItem title="Collections" icon="i-ph-stack" to="/collections" />
    <!-- <NavSiderItem title="Tags" icon="i-ph-hash" to="/tags" /> -->
    <div />
    <NavSiderItem title="Settings" icon="i-ph-gear-six" to="/settings" />
  </nav>
</template>
