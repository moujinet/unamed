<script lang="ts" setup>
const { isAdmin } = useSession()
</script>

<template>
  <ContentSplitView split-view="settings">
    <CommonCellGroup :name="isHydrated ? $t('nav.settings.groups.settings') : ''">
      <CommonCell :label="isHydrated ? $t('nav.settings.interface') : ''" to="/settings/interface" icon="i-ph-airplay" arrow />
      <CommonCell :label="isHydrated ? $t('nav.settings.language') : ''" to="/settings/language" icon="i-ph-globe" arrow />
      <CommonCell :label="isHydrated ? $t('nav.settings.preferences') : ''" to="/settings/preferences" icon="i-ph-wrench" arrow />
      <CommonCell :label="isHydrated ? $t('nav.settings.about') : ''" to="/settings/about" icon="i-ph-info" arrow />
    </CommonCellGroup>

    <CommonCellGroup v-if="isHydrated && isAdmin" :name="$t('nav.settings.groups.administration')">
      <CommonCell :label="$t('nav.settings.system')" to="/settings/system" icon="i-ph-sliders-horizontal" arrow />
    </CommonCellGroup>
  </ContentSplitView>
</template>
