<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <NavTop v-if="isHydrated" />
    <CommonToast v-if="isHydrated" />
  </NuxtLayout>
</template>
