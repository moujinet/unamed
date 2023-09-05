<script lang="ts" setup>
const viewMode = usePreference('interface.viewMode')
const colorMode = usePreference('interface.colorMode')
const colorTheme = usePreference('interface.colorTheme')
</script>

<template>
  <ContentView view="list" title="Interface" icon="i-ph-airplay" fixed-width>
    <CommonBlock name="View Mode">
      <CommonRadioGroup v-model="viewMode" :options="ViewModeOptions" bordered block />
    </CommonBlock>

    <CommonBlock name="Color Mode">
      <CommonRadioGroup v-model="colorMode" :options="ColorModeOptions" bordered block />
    </CommonBlock>

    <CommonBlock name="Color Theme">
      <CommonColorPicker v-model="colorTheme" :options="ColorThemeOptions" />
    </CommonBlock>
  </ContentView>
</template>
