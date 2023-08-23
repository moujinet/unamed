<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>

  <NavTop v-if="isHydrated" />
</template>
