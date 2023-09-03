<script lang="ts" setup>
const toast = useToast()
const { updateProfile, updateAvatar } = useUser()
const { profile, logout, refresh } = useSession()

const form = reactive({
  username: profile.value?.username,
  fullname: profile.value?.fullname,
})

async function handleSubmit() {
  if (!form.username || form.username.trim() === '') {
    return toast.error({
      description: 'Username is required',
    })
  }

  if (await updateProfile(form.username.trim(), form.fullname || '')) {
    toast.success({
      title: 'Update successful',
      afterAction: () => {
        refresh()
      },
    })
  }
}

async function handleAvatarUpload(avatar?: string) {
  if (avatar && await updateAvatar(avatar)) {
    toast.success({
      title: 'Update successful',
      afterAction: () => {
        refresh()
      },
    })
  }
}

async function handleLogout() {
  if (await logout()) {
    toast.success({
      title: 'See you next time!',
      description: 'Bye! 👋',
    })
  }
}
</script>

<template>
  <ContentView view="list" title="Profile" icon="i-ph-user" fixed-width>
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

    <CommonBlock name="Public Profile">
      <CommonFormItem label="Username" required>
        <CommonInput v-model="form.username" placeholder="Please input username" />
      </CommonFormItem>

      <CommonFormItem label="Full Name">
        <CommonInput v-model="form.fullname" placeholder="Please input Full Name" />
      </CommonFormItem>
    </CommonBlock>

    <CommonBlock name="User Avatar">
      <CommonUpload @upload="handleAvatarUpload">
        <CommonButton icon="i-ph-camera text-primary" size="lg" :auto="false" block>
          Upload Your Avatar
        </CommonButton>
      </CommonUpload>
    </CommonBlock>

    <CommonBlock name="Session">
      <CommonButton size="lg" color="danger" block @click="handleLogout">
        Logout
      </CommonButton>
    </CommonBlock>
  </ContentView>
</template>
