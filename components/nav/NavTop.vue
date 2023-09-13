<script lang="ts" setup>
const { y } = useWindowScroll()
const { height } = useWindowSize()

function goTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<template>
  <Teleport to="body">
    <div
      :class="y > height / 2 ? 'flex-(~ center)' : 'hidden'"
      class="fixed bottom-20 right-4 z-100 h-14 w-14 rounded-full bg-primary op-70 sm:bottom-4 active:op-100"
      @click="goTop()"
    >
      <CommonIcon name="i-ph-rocket" size="24" class="text-white" />
    </div>
  </Teleport>
</template>
