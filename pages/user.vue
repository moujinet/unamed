<template>
  <ContentSplitView>
    <CommonCellGroup name="Account">
      <CommonCell title="Profile" to="/user/profile" icon="i-ph-user" arrow />
      <CommonCell title="Collections" to="/user/collections" icon="i-ph-stack" arrow />
      <CommonCell title="Tags" to="/user/tags" icon="i-ph-hash" arrow />
    </CommonCellGroup>

    <CommonCellGroup name="Administrator">
      <CommonCell title="Overview" to="/user/admin/overview" icon="i-ph-activity" arrow />
      <CommonCell title="Users" to="/user/admin/users" icon="i-ph-users" arrow />
      <CommonCell title="System" to="/user/admin/system" icon="i-ph-sliders-horizontal" arrow />
    </CommonCellGroup>
  </ContentSplitView>
</template>
