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
  <ClientOnly>
    <ContentView view="list" :title="$t('nav.settings.preferences')" icon="i-ph-wrench" fixed-width>
      <CommonBlock :name="$t('settings.preferences.groups.general')">
        <CommonCell :label="$t('settings.preferences.opengraph-saving')" collapsed>
          <CommonSwitch v-model="openGraphSaving" />
        </CommonCell>
      </CommonBlock>

      <CommonBlock :name="$t('settings.preferences.groups.display')">
        <CommonCell :label="$t('settings.preferences.collection-icon')" collapsed>
          <CommonSwitch v-model="collectionIcon" />
        </CommonCell>

        <CommonCell :label="$t('settings.preferences.click-count')" collapsed>
          <CommonSwitch v-model="clickCount" />
        </CommonCell>

        <CommonCell :label="$t('settings.preferences.qrcode')" collapsed>
          <CommonSwitch v-model="qrCode" />
        </CommonCell>
      </CommonBlock>

      <CommonBlock :name="$t('settings.preferences.groups.experimental')" icon="i-ph-compass-tool">
        <CommonCell :label="$t('settings.preferences.virtual-scrolling')" collapsed>
          <CommonSwitch v-model="virtualScrolling" />
        </CommonCell>

        <CommonCell :label="$t('settings.preferences.source-tags')" collapsed>
          <CommonSwitch v-model="automaticallySourceTags" />
        </CommonCell>

        <CommonCell :label="$t('settings.preferences.global-shortcuts')" collapsed>
          <CommonSwitch v-model="globalKeyboardShortcuts" />
        </CommonCell>
      </CommonBlock>
    </ContentView>
  </ClientOnly>
</template>
