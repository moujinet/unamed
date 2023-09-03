<script lang="ts" setup>
const toast = useToast()
const { changePassword } = useUser()
const { logout } = useSession()

const password = ref<string>('')
const newPassword = ref<string>('')
const newPasswordConfirm = ref<string>('')

async function handleSubmit() {
  if (!password.value || password.value.trim() === '') {
    return toast.error({
      description: 'Current password is required',
    })
  }

  if (
    !newPassword.value
    || !newPasswordConfirm.value
    || newPassword.value.trim() === ''
    || newPasswordConfirm.value.trim() === ''
  ) {
    return toast.error({
      description: 'New password is required',
    })
  }

  if (newPassword.value !== newPasswordConfirm.value) {
    return toast.error({
      description: 'New password and Re-type new password must be the same',
    })
  }

  if (password.value === newPasswordConfirm.value) {
    return toast.error({
      description: 'Current password and new password must be different',
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
      title: 'Change password successful',
      description: 'You should login again',
      timeout: 1000,
      afterTimeout: async () => {
        await logout()
      },
    })
  }
}
</script>

<template>
  <ContentView view="list" title="Security" icon="i-ph-lock" fixed-width>
    <template #header>
      <CommonButton
        color="primary"
        type="solid"
        size="sm"
        icon="i-ph-floppy-disk"
        @click="handleSubmit"
      >
        Save
      </CommonButton>
    </template>

    <CommonBlock name="Password">
      <CommonFormItem label="Current Password" required>
        <CommonInput v-model="password" type="password" placeholder="Please input Current Password" />
      </CommonFormItem>

      <CommonFormItem label="New Password" required>
        <CommonInput v-model="newPassword" type="password" placeholder="Please input New Password" />
      </CommonFormItem>

      <CommonFormItem label="Re-Type New Password" required>
        <CommonInput v-model="newPasswordConfirm" type="password" placeholder="Please Re-Type New Password" @keyup.enter="handleSubmit" />
      </CommonFormItem>
    </CommonBlock>
  </ContentView>
</template>
