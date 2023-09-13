<script lang="ts" setup>
const loginModal = useModal('user.login.form')
</script>

<template>
  <div hidden lg:block p="lg:x-6 y-5">
    <div mb-3 text-4.5 text-caption>
      {{ $t('user.login.messages.welcome') }}
    </div>
    <div text-sm>
      {{ $t('user.login.messages.slogan') }}
    </div>
  </div>

  <div p="x-3 lg:x-6 b-20px">
    <CommonTooltip v-if="isHydrated" :content="$t('user.actions.login')" placement="right" :disabled="isDesktop" @click="loginModal = true">
      <CommonButton
        color="primary"
        :type="isLaptop ? 'plain' : 'fill'"
        size="lg"
        :class-name="isLaptop ? 'py-1!' : 'lt-lg:py-3!'"
        :icon="isDesktop ? '' : 'i-ph-user-circle text-8'"
        block
      >
        {{ $t('user.actions.login') }}
      </CommonButton>
    </CommonTooltip>

    <UserLoginModal target="body" />
    <UserRegisterModal target="body" />
  </div>
</template>
