<script lang="ts" setup>
defineProps<{
  name: string
  type: string
  description?: string
  defaultValue?: string
  allowedValues?: string[]
  required?: boolean
}>()
</script>

<template>
  <div class="api-param" pt="2" pb="4" px="6" hover:text-teal>
    <div flex="~ v-center justify-between" py-1>
      <div flex="~ v-center gap-x-4">
        <strong>{{ name }}</strong>
        <small class="text-blueGray-500/80">{{ type }}</small>
      </div>
      <div text="xs teal/70" select-none>
        {{ required ? 'required' : '' }}
      </div>
    </div>
    <div v-if="description" text="xs blueGray-400">
      {{ description }}
    </div>
    <div flex="~ v-center">
      <div v-if="defaultValue" text="xs" flex="~ v-center gap-x-4" py-2>
        Default:
        <div
          p="x-1.5 y-0.5"
          text="xs"
          bg="blueGray/5"
          border="~ solid [--vp-c-divider]"
          rounded
        >
          {{ defaultValue }}
        </div>
      </div>
      <div v-if="allowedValues" text="xs" flex="~ v-center gap-x-4" py-2>
        allowed values:
        <div
          v-for="value in allowedValues"
          :key="value"
          p="x-1.5 y-0.5"
          text="xs"
          bg="blueGray/5"
          border="~ solid [--vp-c-divider]"
          rounded
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>
