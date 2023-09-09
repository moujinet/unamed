<script lang="ts" setup>
import { ref } from 'vue'

withDefaults(defineProps<{
  dataType?: string
}>(), {
  dataType: 'undefined',
})

const collapsed = ref(true)
</script>

<template>
  <div mt="6" rounded="md" style="border: 1px solid var(--vp-c-divider)">
    <div
      text="xs"
      cursor-pointer select-none
      flex="~ v-center justify-between"
      p="4"
      :style="collapsed ? '' : 'border-bottom: 1px solid var(--vp-c-divider)'"
      @click="collapsed = !collapsed"
    >
      <div flex="~ v-center gap-x-2">
        <i class="i-ph-caret-right transition-transform" :class="collapsed ? '' : 'rotate-90'" />
        <span>Schema: <code>application/json</code></span>
      </div>
    </div>
    <div v-show="!collapsed" flex="~ col gap-y-2" p="4">
      <ApiParam
        name="code"
        type="string"
      />
      <slot>
        <ApiParam
          name="data"
          :type="dataType"
        />
      </slot>
      <ApiParam
        name="message"
        type="string"
      />
    </div>
  </div>
</template>
