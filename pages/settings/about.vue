<template>
  <ContentView title="About" icon="i-ph-info" collapsed auto-hide-header fixed-width>
    <div flex="~ col v-center gap-y-8" py-12>
      <NavLogo size="72" />
      <span text="caption lg:5 center">A lightweight, <br> self-hosted bookmarking web service.</span>
    </div>

    <div flex="~ col gap-y-2" border="b base" px-2 py-4>
      <CommonCell label="Version" value="1.0.0" />
      <CommonCell label="Built">
        <div flex="~ v-center gap-x-3">
          <CommonIcon name="i-ph-git-commit" size="16" />
          <NuxtLink to="https://github.com/moujinet/unamed" class="hover:text-primary">
            929049d
          </NuxtLink>
          <span text-comment>(2023/08/14 09:11:32)</span>
        </div>
      </CommonCell>
      <CommonCell label="Homepage" to="https://github.com/moujinet/unamed" />
      <CommonCell label="Documents" to="https://github.com/moujinet/unamed" />
      <CommonCell label="Repository" to="https://github.com/moujinet/unamed" />
    </div>

    <div border="b-1 base" py-5>
      <h3 text="caption 16px" px-6>
        About
      </h3>
      <div px-6 pt-5>
        Unamed is a bookmarking and link shortening service that enables easy saving and sharing of links. It allows you to store, categorize, and share links with custom short URLs. You can search, filter, and access your saved links from any device. It also supports team sharing of link libraries for easy collaboration.
      </div>
    </div>

    <div py-5>
      <h3 text="caption 16px" px-6>
        <i i-ph-heart-fill text="24px pink" />
        Sponsors
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
</template>
