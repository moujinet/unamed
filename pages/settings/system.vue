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
  <ContentView view="list" title="System" icon="i-ph-sliders-horizontal" fixed-width>
    <CommonBlock name="General">
      <CommonFormItem label="App Name" required>
        <CommonInput v-model="appName" placeholder="Please input App Name" />
      </CommonFormItem>

      <CommonFormItem label="App Domain" required>
        <CommonInput v-model="appDomain" placeholder="i.e. https://example.com" />
      </CommonFormItem>
    </CommonBlock>

    <CommonBlock name="Attachments">
      <CommonFormItem label="Upload Path" required>
        <CommonInput v-model="uploadPath" placeholder="i.e. /upload" />
      </CommonFormItem>

      <CommonFormItem label="Path Format" required>
        <CommonSelect v-model="uploadPathFormat" :options="PathFormatOptions" />
      </CommonFormItem>
    </CommonBlock>
  </ContentView>
</template>
