<script lang="ts" setup>
const openGraphSaving = usePreference('general.openGraphSaving')
const collectionIcon = usePreference('display.collectionIcon')
const clickCount = usePreference('display.clickCount')
const qrCode = usePreference('display.qrCode')
const virtualScrolling = usePreference('experimental.virtualScrolling')
const automaticallySourceTags = usePreference('experimental.sourceTags')
const globalKeyboardShortcuts = usePreference('experimental.globalKeyboardShortcuts')
</script>

<template>
  <ContentView view="list" title="Preferences" icon="i-ph-wrench" fixed-width>
    <CommonBlock name="General">
      <CommonCell label="OpenGraph Saving" collapsed>
        <CommonSwitch v-model="openGraphSaving" />
      </CommonCell>
    </CommonBlock>

    <CommonBlock name="Display">
      <CommonCell label="Collection Icon" collapsed>
        <CommonSwitch v-model="collectionIcon" />
      </CommonCell>

      <CommonCell label="Click Count" collapsed>
        <CommonSwitch v-model="clickCount" />
      </CommonCell>

      <CommonCell label="QRCode" collapsed>
        <CommonSwitch v-model="qrCode" />
      </CommonCell>
    </CommonBlock>

    <CommonBlock name="Experimental" icon="i-ph-compass-tool">
      <CommonCell label="Virtual Scrolling" collapsed>
        <CommonSwitch v-model="virtualScrolling" />
      </CommonCell>

      <CommonCell label="Automatically Source Tags" collapsed>
        <CommonSwitch v-model="automaticallySourceTags" />
      </CommonCell>

      <CommonCell label="Global Keyboard Shortcuts" collapsed>
        <CommonSwitch v-model="globalKeyboardShortcuts" />
      </CommonCell>
    </CommonBlock>
  </ContentView>
</template>
