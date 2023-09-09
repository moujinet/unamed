<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{
  public?: boolean
}>()

const collapsed = ref(true)
</script>

<template>
  <div v-if="!public" text="xs" mt="6" rounded="md" style="border: 1px solid var(--vp-c-divider)">
    <div
      cursor-pointer select-none
      flex="~ v-center gap-x-2"
      p="4"
      :style="collapsed ? '' : 'border-bottom: 1px solid var(--vp-c-divider)'"
      @click="collapsed = !collapsed"
    >
      <i class="i-ph-caret-right transition-transform" :class="collapsed ? '' : 'rotate-90'" />
      <i i-ph-lock-key-fill text="lg violet" />
      <span>Security: <code class="text-violet!">Bearer Auth</code></span>
    </div>
    <div v-show="!collapsed" flex="~ col gap-y-2" p="4">
      <span>Provide your bearer token in the Authorization header when making requests to protected resources.</span>
      <span>Example: <code class="text-violet!">Authorization: Bearer &lt;token&gt;</code></span>
    </div>
  </div>
</template>
