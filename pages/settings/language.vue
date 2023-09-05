<script lang="ts" setup>
const language = usePreference('interface.language')
</script>

<template>
  <ContentView view="list" title="Language" icon="i-ph-globe" fixed-width>
    <CommonBlock name="Display Language">
      <CommonSelect v-model="language" :options="LanguageOptions" />
    </CommonBlock>
  </ContentView>
</template>
