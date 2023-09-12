<script lang="ts" setup>
const colorMode = useColorMode()

const viewModeValue = usePreference('interface.viewMode')
const colorModeValue = usePreference('interface.colorMode')
const colorThemeValue = usePreference('interface.colorTheme')

watch(colorModeValue, (value) => {
  colorMode.preference = value
})
</script>

<template>
  <ContentView view="list" title="Interface" icon="i-ph-airplay" fixed-width>
    <CommonBlock name="View Mode">
      <CommonRadioGroup v-model="viewModeValue" :options="ViewModeOptions" bordered block />
    </CommonBlock>

    <CommonBlock name="Color Mode">
      <CommonRadioGroup v-model="colorModeValue" :options="ColorModeOptions" bordered block />
    </CommonBlock>

    <CommonBlock name="Color Theme">
      <CommonColorPicker v-model="colorThemeValue" :options="ColorThemeOptions" />
    </CommonBlock>
  </ContentView>
</template>
