<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <ContentSplitView split-view="user">
    <CommonCellGroup :name="isHydrated ? $t('nav.user.groups.account') : ''">
      <CommonCell :label="isHydrated ? $t('nav.user.profile') : ''" to="/user/profile" icon="i-ph-user" arrow />
      <CommonCell :label="isHydrated ? $t('nav.user.security') : ''" to="/user/security" icon="i-ph-lock" arrow />
    </CommonCellGroup>
  </ContentSplitView>
</template>
