<script lang="ts" setup>
const language = usePreference('interface.language')
</script>

<template>
  <ClientOnly>
    <ContentView view="list" :title="$t('nav.settings.language')" icon="i-ph-globe" fixed-width>
      <CommonBlock :name="$t('settings.language.display')">
        <CommonSelect v-model="language" :options="LanguageOptions" />
      </CommonBlock>
    </ContentView>
  </ClientOnly>
</template>
