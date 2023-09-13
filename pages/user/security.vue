<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

definePageMeta({
  middleware: 'auth',
})

const toast = useToast()
const { changePassword } = useUser()
const { logout } = useSession()
const { t } = useI18n()

const password = ref<string>('')
const newPassword = ref<string>('')
const newPasswordConfirm = ref<string>('')

async function handleSubmit() {
  if (!password.value || password.value.trim() === '') {
    return toast.error({
      description: t('common.messages.required', { name: t('user.form.current-password') }),
    })
  }

  if (
    !newPassword.value
    || !newPasswordConfirm.value
    || newPassword.value.trim() === ''
    || newPasswordConfirm.value.trim() === ''
  ) {
    return toast.error({
      description: t('common.messages.required', { name: t('user.form.new-password') }),
    })
  }

  if (newPassword.value !== newPasswordConfirm.value) {
    return toast.error({
      description: t('user.messages.password-not-same'),
    })
  }

  if (password.value === newPasswordConfirm.value) {
    return toast.error({
      description: t('user.messages.password-must-be-different'),
    })
  }

  if (await changePassword(
    password.value.trim(),
    newPassword.value.trim(),
    newPasswordConfirm.value.trim(),
  )) {
    password.value = ''
    newPassword.value = ''
    newPasswordConfirm.value = ''

    toast.success({
      title: t('user.messages.change-password-success'),
      description: t('user.messages.login-again'),
      timeout: 1000,
      afterTimeout: async () => {
        await logout()
      },
    })
  }
}
</script>

<template>
  <ContentView view="list" :title="isHydrated ? $t('nav.user.security') : ''" icon="i-ph-lock" fixed-width>
    <template #header>
      <CommonButton
        color="primary"
        type="solid"
        size="sm"
        icon="i-ph-floppy-disk"
        @click="handleSubmit"
      >
        {{ $t('common.actions.save') }}
      </CommonButton>
    </template>

    <CommonBlock :name="isHydrated ? $t('user.groups.password') : ''">
      <CommonFormItem :label="isHydrated ? $t('user.form.current-password') : ''" required>
        <CommonInput v-model="password" type="password" :placeholder="$t('common.tips.required', { name: $t('user.form.current-password') })" />
      </CommonFormItem>

      <CommonFormItem :label="isHydrated ? $t('user.form.new-password') : ''" required>
        <CommonInput v-model="newPassword" type="password" :placeholder="$t('common.tips.required', { name: $t('user.form.new-password') })" />
      </CommonFormItem>

      <CommonFormItem :label="isHydrated ? $t('user.form.re-type-new-password') : ''" required>
        <CommonInput v-model="newPasswordConfirm" type="password" :placeholder="$t('common.tips.required', { name: $t('user.form.re-type-new-password') })" @keyup.enter="handleSubmit" />
      </CommonFormItem>
    </CommonBlock>
  </ContentView>
</template>
