<script lang="ts" setup>
const buildInfo = useAppConfig().buildInfo
</script>

<template>
  <ClientOnly>
    <ContentView :title="$t('nav.settings.about')" icon="i-ph-info" fixed-width collapsed auto-hide-header>
      <div flex="~ col v-center gap-y-8" py-12>
        <NavLogo size="72" />
        <span text="caption lg:5 center">{{ $t('settings.about.slogan') }}</span>
      </div>

      <div flex="~ col gap-y-2" border="b base" px-2 py-4>
        <CommonCell :label="$t('settings.about.version')" :value="`${buildInfo.version}(${buildInfo.env})`" />
        <CommonCell :label="$t('settings.about.built')">
          <div flex="~ v-center gap-x-3">
            <CommonIcon name="i-ph-git-commit" size="16" />
            <NuxtLink :to="`https://github.com/moujinet/unamed/commit/${buildInfo.commit}`" class="hover:text-primary">
              {{ buildInfo.shortCommit }}
            </NuxtLink>
            <span text-comment>({{ formatDate(buildInfo.time, 'YYYY/MM/DD HH:mm') }})</span>
          </div>
        </CommonCell>
        <CommonCell :label="$t('settings.about.homepage')" to="https://github.com/moujinet/unamed" />
        <CommonCell :label="$t('settings.about.docs')" to="https://github.com/moujinet/unamed" />
        <CommonCell :label="$t('settings.about.repo')" to="https://github.com/moujinet/unamed" />
      </div>

      <div border="b-1 base" py-5>
        <h3 text="caption 16px" px-6>
          {{ $t('nav.settings.about') }}
        </h3>
        <div px-6 pt-5>
          Unamed is a bookmarking and link shortening service that enables easy saving and sharing of links. It allows you to store, categorize, and share links with custom short URLs. You can search, filter, and access your saved links from any device. It also supports team sharing of link libraries for easy collaboration.
        </div>
      </div>

      <div py-5>
        <h3 text="caption 16px" px-6>
          <i i-ph-heart-fill text="24px pink" />
          {{ $t('nav.settings.sponsors') }}
        </h3>
        <div px-6 pt-5>
          Unamed is a bookmarking and link shortening service that enables easy saving and sharing of links. It allows you to store, categorize, and share links with custom short URLs. You can search, filter, and access your saved links from any device. It also supports team sharing of link libraries for easy collaboration.

          <div flex="~ h-center" mt-5>
            <CommonButton icon="i-ph-heart text-pink" :auto="false">
              Donate to Unamed
            </CommonButton>
          </div>
        </div>
      </div>
    </ContentView>
  </ClientOnly>
</template>
