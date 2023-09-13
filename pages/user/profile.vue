<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

definePageMeta({
  middleware: 'auth',
})

const toast = useToast()
const { updateProfile } = useUser()
const { profile, logout, refresh } = useSession()
const { t } = useI18n()

const form = reactive({
  username: profile.value?.username,
  fullname: profile.value?.fullname,
})

async function handleSubmit() {
  if (!form.username || form.username.trim() === '') {
    return toast.error({
      description: t('common.messages.required', { name: t('user.form.username') }),
    })
  }

  if (await updateProfile(form.username.trim(), form.fullname || '')) {
    toast.success({
      title: t('common.messages.success'),
      afterAction: () => {
        refresh()
      },
    })
  }
}

async function handleAvatarUpload(avatar?: string) {
  if (avatar) {
    toast.success({
      title: t('common.messages.success'),
      afterAction: () => {
        refresh()
      },
    })
  }
}

function handleChangePassword() {
  navigateTo('/user/security')
}

async function handleLogout() {
  if (await logout()) {
    toast.success({
      title: t('user.logout.messages.title'),
      description: t('user.logout.messages.description'),
      afterAction: () => {
        navigateTo('/')
      },
    })
  }
}
</script>

<template>
  <ClientOnly>
    <ContentView view="list" :title="$t('nav.user.profile')" icon="i-ph-user" fixed-width>
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

      <CommonBlock :name="$t('user.groups.profile')">
        <CommonFormItem :label="$t('user.form.username')" required>
          <CommonInput v-model="form.username" :placeholder="$t('common.tips.required', { name: $t('user.form.username') })" />
        </CommonFormItem>

        <CommonFormItem :label="$t('user.form.fullname')">
          <CommonInput v-model="form.fullname" :placeholder="$t('common.tips.required', { name: $t('user.form.fullname') })" />
        </CommonFormItem>
      </CommonBlock>

      <CommonBlock :name="$t('user.groups.avatar')">
        <CommonUpload @upload="handleAvatarUpload">
          <CommonButton icon="i-ph-camera text-primary" size="lg" :auto="false" block>
            {{ $t('user.actions.upload') }}
          </CommonButton>
        </CommonUpload>
      </CommonBlock>

      <CommonBlock v-if="isMobile" :name="$t('user.groups.password')">
        <CommonButton icon="i-ph-pencil-simple text-primary" size="lg" :auto="false" block @click="handleChangePassword">
          {{ $t('user.actions.change-password') }}
        </CommonButton>
      </CommonBlock>

      <CommonBlock :name="$t('user.groups.session')">
        <CommonButton size="lg" color="danger" block @click="handleLogout">
          {{ $t('user.actions.logout') }}
        </CommonButton>
      </CommonBlock>
    </ContentView>
  </ClientOnly>
</template>
