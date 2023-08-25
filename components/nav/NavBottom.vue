<script lang="ts" setup>
</script>

<template>
  <footer
    class="shadow-[0_-5px_15px_5px_rgba(0,0,0,0.4)]"
    border="t-1 base"
    fixed bottom-0 z-100 hidden h-64px w-full bg-sider backdrop-blur-sm lt-sm:block
  >
    <div flex="~ v-center justify-around" h-full>
      <NuxtLink to="/" class="nav" active-class="text-primary">
        <CommonIcon name="i-ph-bookmarks" size="24" />
        <span text-3>
          Bookmarks
        </span>
      </NuxtLink>
      <NuxtLink to="/user/collections" class="nav" active-class="text-primary">
        <CommonIcon name="i-ph-stack" size="24" />
        <span text-3>
          Collections
        </span>
      </NuxtLink>
      <NuxtLink to="/search" class="nav" active-class="text-primary">
        <CommonIcon name="i-ph-magnifying-glass" size="24" />
        <span text-3>
          Search
        </span>
      </NuxtLink>
      <NuxtLink to="/settings" class="nav" active-class="text-primary">
        <CommonIcon name="i-ph-gear-six" size="24" />
        <span text-3>
          Settings
        </span>
      </NuxtLink>
      <NuxtLink class="nav" active-class="text-primary">
        <CommonIcon name="i-ph-dots-three-circle" size="24" />
        <span text-3>
          More
        </span>
      </NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.nav {
  --at-apply: flex-(~ col center);
}
</style>
