<script lang="ts" setup>
const { isAdmin } = useSession()
</script>

<template>
  <ContentSplitView split-view="settings">
    <CommonCellGroup name="Settings">
      <CommonCell label="Interface" to="/settings/interface" icon="i-ph-airplay" arrow />
      <CommonCell label="Language" to="/settings/language" icon="i-ph-globe" arrow />
      <CommonCell label="Preferences" to="/settings/preferences" icon="i-ph-wrench" arrow />
      <CommonCell label="About" to="/settings/about" icon="i-ph-info" arrow />
    </CommonCellGroup>

    <CommonCellGroup v-if="isHydrated && isAdmin" name="Administration">
      <CommonCell label="System" to="/settings/system" icon="i-ph-sliders-horizontal" arrow />
    </CommonCellGroup>
  </ContentSplitView>
</template>
