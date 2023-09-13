<template>
  <div flex="~ lg:justify-between v-center sm:justify-center" py-2>
    <NuxtLink class="flex flex-v-center gap-x-10px" to="/">
      <NavLogo />
      <h1 v-if="isHydrated" class="hidden select-none text-[28px] font-600 leading-none tracking-[-0.08em] text-$c-text-light lg:block">
        {{ $t('nav.title') }}
      </h1>
    </NuxtLink>
    <NavBack v-if="isDesktop && isHydrated" />
  </div>
</template>
