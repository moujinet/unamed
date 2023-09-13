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
  <ClientOnly>
    <ContentView view="list" :title="$t('nav.settings.interface')" icon="i-ph-airplay" fixed-width>
      <CommonBlock :name="$t('settings.interface.view-mode')">
        <CommonRadioGroup v-model="viewModeValue" :options="ViewModeOptions" bordered block />
      </CommonBlock>

      <CommonBlock :name="$t('settings.interface.color-mode')">
        <CommonRadioGroup v-model="colorModeValue" :options="ColorModeOptions" bordered block />
      </CommonBlock>

      <CommonBlock :name="$t('settings.interface.color-theme')">
        <CommonColorPicker v-model="colorThemeValue" :options="ColorThemeOptions" />
      </CommonBlock>
    </ContentView>
  </ClientOnly>
</template>
