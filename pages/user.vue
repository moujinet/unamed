<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <ContentSplitView split-view="user">
    <CommonCellGroup name="Account">
      <CommonCell label="Profile" to="/user/profile" icon="i-ph-user" arrow />
      <CommonCell label="Security" to="/user/security" icon="i-ph-lock" arrow />
    </CommonCellGroup>
  </ContentSplitView>
</template>
