<script lang="ts" setup>
const loginForm = reactive({
  username: '',
  password: '',
})
const loginModal = useModal('user.login.form')
const registerModal = useModal('user.register.form')

const loading = ref(false)
const { error, login } = useSession()

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
      title: 'Welcome!',
      description: 'Enjoy your journey!',
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
          Login
        </h1>
      </div>
      <div flex="~ gap-x-3" pt-6>
        Don't have an account?
        <NuxtLink class="cursor-pointer text-primary/80 hover:text-primary" @click="registerModal = true">
          Register
        </NuxtLink>
      </div>
      <div flex="~ col gap-y-5" w-full p-8>
        <div flex="~ col gap-y-5" pb-4>
          <CommonAlert :visible="error !== ''" :content="error" closeable @close="error = ''" />
          <CommonFormItem>
            <CommonInput v-model="loginForm.username" type="text" placeholder="Username" icon="i-ph-user" />
          </CommonFormItem>
          <CommonFormItem>
            <CommonInput v-model="loginForm.password" type="password" placeholder="Password" icon="i-ph-password" @keyup.enter="handleLogin" />
          </CommonFormItem>
        </div>
        <CommonButton color="primary" size="lg" :loading="loading" block @click="handleLogin">
          Login
        </CommonButton>
      </div>
    </div>
  </CommonModal>
</template>
