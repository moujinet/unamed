<script lang="ts" setup>
const { isLoggedIn } = useSession()
const loginModal = useModal('user.login.form')

function handleMyClick() {
  if (isLoggedIn.value)
    navigateTo('/user/profile')
  else
    loginModal.value = true
}
</script>

<template>
  <footer
    class="shadow-[0_-5px_15px_5px_rgba(0,0,0,0.4)]"
    border="t-1 base"
    fixed bottom-0 z-100 hidden h-64px w-full bg-sider backdrop-blur-sm lt-sm:block
  >
    <div flex="~ v-center justify-around" h-full>
      <NuxtLink
        to="/bookmarks"
        class="nav"
        :class="$route.fullPath.startsWith('/bookmarks') ? 'text-primary' : ''"
      >
        <CommonIcon name="i-ph-bookmarks" size="24" />
        <span text-3>
          {{ $t('nav.bottom.bookmarks') }}
        </span>
      </NuxtLink>
      <NuxtLink
        to="/collections"
        class="nav"
        :class="$route.fullPath.startsWith('/collections') ? 'text-primary' : ''"
      >
        <CommonIcon name="i-ph-stack" size="24" />
        <span text-3>
          {{ $t('nav.bottom.collections') }}
        </span>
      </NuxtLink>
      <NuxtLink
        to="/settings"
        class="nav"
        :class="$route.fullPath.startsWith('/settings') ? 'text-primary' : ''"
      >
        <CommonIcon name="i-ph-gear-six" size="24" />
        <span text-3>
          {{ $t('nav.bottom.settings') }}
        </span>
      </NuxtLink>
      <NuxtLink
        class="nav"
        :class="$route.fullPath.startsWith('/user') ? 'text-primary' : ''"
        @click="handleMyClick"
      >
        <CommonIcon name="i-ph-user-circle" size="24" />
        <span text-3>
          {{ $t('nav.bottom.my') }}
        </span>
      </NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.nav {
  --at-apply: flex-(~ col center) w-1/4;
}
</style>
