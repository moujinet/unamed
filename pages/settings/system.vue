<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

const appName = usePreference('system.appName')
const appDomain = usePreference('system.appDomain')
const uploadPath = usePreference('system.uploadPath')
const uploadPathFormat = usePreference('system.uploadPathFormat')
</script>

<template>
  <ClientOnly>
    <ContentView view="list" :title="$t('nav.settings.system')" icon="i-ph-sliders-horizontal" fixed-width>
      <CommonBlock :name="$t('settings.system.groups.general')">
        <CommonFormItem :label="$t('settings.system.general.app-name')" required>
          <CommonInput v-model="appName" :placeholder="$t('common.tips.required', { name: $t('settings.system.general.app-name') })" />
        </CommonFormItem>

        <CommonFormItem :label="$t('settings.system.general.app-domain')" required>
          <CommonInput v-model="appDomain" :placeholder="$t('common.tips.example', { example: 'https://www.example.com/' })" />
        </CommonFormItem>
      </CommonBlock>

      <CommonBlock :name="$t('settings.system.groups.attachments')">
        <CommonFormItem :label="$t('settings.system.attachments.upload-path')" required>
          <CommonInput v-model="uploadPath" :placeholder="$t('common.tips.example', { example: '/uploads' })" />
        </CommonFormItem>

        <CommonFormItem :label="$t('settings.system.attachments.upload-path-format')" required>
          <CommonSelect v-model="uploadPathFormat" :options="PathFormatOptions" />
        </CommonFormItem>
      </CommonBlock>
    </ContentView>
  </ClientOnly>
</template>
