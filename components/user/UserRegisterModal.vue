<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const registerModal = useModal('user.register.form')
const loginModal = useModal('user.login.form')

const loading = ref(false)
const { error, register } = useSession()
const { t } = useI18n()

const registerForm = reactive({
  username: '',
  password: '',
  passwordConfirm: '',
})

// Reset form
watch(registerModal, (newVal) => {
  if (newVal) {
    registerForm.username = ''
    registerForm.password = ''
    registerForm.passwordConfirm = ''

    error.value = ''
    loading.value = false
  }
})

async function handleRegister() {
  const toast = useToast()
  const { username, password, passwordConfirm } = registerForm

  loading.value = true
  error.value = ''

  if (await register(username, password, passwordConfirm)) {
    toast.success({
      title: t('user.register.messages.title'),
      description: t('user.register.messages.description'),
      afterAction: () => {
        loginModal.value = true
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
    v-model:visible="registerModal"
    :header="false"
    :footer="false"
  >
    <div flex="~ col v-center" py-5>
      <div flex="~ center gap-x-4">
        <NavLogo size="32" />
        <h1 text="24px caption" tracking-tighter uppercase>
          {{ $t('user.actions.register') }}
        </h1>
      </div>
      <div flex="~ gap-x-3" pt-6>
        {{ $t('user.register.title') }}
        <NuxtLink class="cursor-pointer text-primary/80 hover:text-primary" @click="loginModal = true">
          {{ $t('user.actions.login') }}
        </NuxtLink>
      </div>
      <div flex="~ col gap-y-5" w-full p-8>
        <div flex="~ col gap-y-5" pb-4 transition-all>
          <CommonAlert :visible="error !== ''" :content="error" closeable @close="error = ''" />
          <CommonFormItem>
            <CommonInput v-model="registerForm.username" type="text" :placeholder="$t('user.form.username')" icon="i-ph-user" />
          </CommonFormItem>
          <CommonFormItem>
            <CommonInput v-model="registerForm.password" type="password" :placeholder="$t('user.form.password')" icon="i-ph-password" />
          </CommonFormItem>
          <CommonFormItem>
            <CommonInput v-model="registerForm.passwordConfirm" type="password" :placeholder="$t('user.form.re-type-password')" icon="i-ph-password" @keyup.enter="handleRegister" />
          </CommonFormItem>
        </div>

        <CommonButton color="primary" size="lg" :loading="loading" block @click="handleRegister">
          {{ $t('user.actions.register') }}
        </CommonButton>
      </div>
    </div>
  </CommonModal>
</template>
