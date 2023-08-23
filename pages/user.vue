<template>
  <ContentSplitView>
    <CommonCellGroup name="Account">
      <CommonCell label="Profile" to="/user/profile" icon="i-ph-user" arrow />
      <CommonCell label="Collections" to="/user/collections" icon="i-ph-stack" arrow />
      <CommonCell label="Tags" to="/user/tags" icon="i-ph-hash" arrow />
    </CommonCellGroup>

    <CommonCellGroup name="Administrator">
      <CommonCell label="Overview" to="/user/admin/overview" icon="i-ph-activity" arrow />
      <CommonCell label="Users" to="/user/admin/users" icon="i-ph-users" arrow />
      <CommonCell label="System" to="/user/admin/system" icon="i-ph-sliders-horizontal" arrow />
    </CommonCellGroup>
  </ContentSplitView>
</template>
