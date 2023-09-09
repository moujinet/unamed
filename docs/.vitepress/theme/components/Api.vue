<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  method: string
  endpoint: string
  description?: string
}>(), {
  method: 'GET',
})

const paths = props.endpoint.split('/')
const last = paths.pop()
</script>

<template>
  <div class="api-block">
    <span :class="`is-${method}`">{{ method }}</span>
    <code>
      {{ `${paths.join('/')}/` }}<strong>{{ last }}</strong>
    </code>
  </div>

  <div v-if="description" p="t-8">
    {{ description }}
  </div>
</template>

<style scoped>
.api-block {
  --at-apply: p-3 rounded flex flex-v-center gap-x-2 mt-8;

  > span {
    --at-apply: uppercase text-xs px-2.5 py-1 rounded font-bold text-white;

    &.is-get {
      background: #05c779;
    }
    &.is-post {
      background: #19abff;
    }
    &.is-patch,
    &.is-put {
      background: #f46d2a;
    }
    &.is-delete {
      background: #fa383e;
    }
  }

  > code {
    --at-apply: bg-transparent text-xs;

    color: var(--vp-c-text-1);
  }

  background-color: var(--vp-code-bg);
}
</style>
