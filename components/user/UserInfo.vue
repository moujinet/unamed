<script lang="ts" setup>
withDefaults(defineProps<{
  auto?: boolean
}>(), {
  auto: true,
})

const { profile } = useSession()
</script>

<template>
  <div
    :class="auto ? 'lt-lg:flex-col-reverse' : ''"
    flex="~ v-center justify-between gap-y-8"
    p="lg:x-6 y-5"
    select-none
  >
    <NuxtLink
      flex="~ v-center gap-x-4"
      to="/user/profile"
    >
      <div
        class="h-32px w-32px rounded-full leading-none"
        flex="~ center"
        ring="3 primary"
      >
        <NuxtImg :src="profile.avatar || 'https://placekitten.com/32/32'" preset="avatar" loading="lazy" class="rounded-full" />
      </div>
      <div
        :class="auto ? 'hidden lg:block' : ''"
      >
        <h3 text="caption 16px" leading-relaxed>
          {{ profile.fullname || profile.username }}
        </h3>
        <div text="comment 13px" leading-none>
          {{ profile.is_admin ? 'Administrator' : 'Member' }}
        </div>
      </div>
    </NuxtLink>
    <slot>
      <CommonTooltip :content="$t('nav.sider.profile')" :placement="isDesktop ? 'top' : 'right'" :disabled="isMobile">
        <NuxtLink to="/user/profile" :class="$route.fullPath.startsWith('/user') ? 'text-primary' : ''" hover:text-primary>
          <CommonIcon name="i-ph-sliders-horizontal" size="20" />
        </NuxtLink>
      </CommonTooltip>
    </slot>
  </div>
</template>
