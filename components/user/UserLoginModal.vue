<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const loginForm = reactive({
  username: '',
  password: '',
})
const loginModal = useModal('user.login.form')
const registerModal = useModal('user.register.form')

const loading = ref(false)
const { error, login } = useSession()
const { t } = useI18n()

// Reset form
watch(loginModal, (newVal) => {
  if (newVal) {
    loginForm.username = ''
    loginForm.password = ''

    error.value = ''
    loading.value = false
  }
})

async function handleLogin() {
  const toast = useToast()
  const { username, password } = loginForm

  loading.value = true
  error.value = ''

  if (await login(username, password)) {
    toast.success({
      title: t('user.login.messages.title'),
      description: t('user.login.messages.description'),
      afterAction: () => {
        loginModal.value = false
      },
    })
  }
  else {
    loading.value = false
  }
}
</script>

<template>
  <CommonModal
    v-model:visible="loginModal"
    :header="false"
    :footer="false"
  >
    <div flex="~ col v-center" py-5>
      <div flex="~ center gap-x-4">
        <NavLogo size="32" />
        <h1 text="24px caption" tracking-tighter uppercase>
          {{ $t('user.actions.login') }}
        </h1>
      </div>
      <div flex="~ gap-x-3" pt-6>
        {{ $t('user.login.title') }}
        <NuxtLink class="cursor-pointer text-primary/80 hover:text-primary" @click="registerModal = true">
          {{ $t('user.actions.register') }}
        </NuxtLink>
      </div>
      <div flex="~ col gap-y-5" w-full p-8>
        <div flex="~ col gap-y-5" pb-4>
          <CommonAlert :visible="error !== ''" :content="error" closeable @close="error = ''" />
          <CommonFormItem>
            <CommonInput v-model="loginForm.username" type="text" :placeholder="$t('user.form.username')" icon="i-ph-user" />
          </CommonFormItem>
          <CommonFormItem>
            <CommonInput v-model="loginForm.password" type="password" :placeholder="$t('user.form.password')" icon="i-ph-password" @keyup.enter="handleLogin" />
          </CommonFormItem>
        </div>
        <CommonButton color="primary" size="lg" :loading="loading" block @click="handleLogin">
          {{ $t('user.actions.login') }}
        </CommonButton>
      </div>
    </div>
  </CommonModal>
</template>
