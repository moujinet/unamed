<script lang="ts" setup>
const props = defineProps<{
  label: string
  icon?: string
  to?: string
  value?: string
  arrow?: boolean
  underline?: boolean
  clickable?: boolean
  collapsed?: boolean
}>()

const isClickable = computed(() => props.clickable || props.to)

function handleClick() {
  props.to && navigateTo(props.to)
}
</script>

<template>
  <div
    :class="{
      'border-b border-base': underline,
      'p-0': collapsed,
      'px-5 py-3': !collapsed,
      'active:bg-sider hover:text-primary cursor-pointer': isClickable,
      'text-primary': isClickable && $route.fullPath === to,
    }"
    flex="~ v-center justify-between"
    text="base"
    select-none
    @click="handleClick"
  >
    <div flex="~ v-center gap-x-3">
      <CommonIcon v-if="icon" :name="icon" size="18" />
      <div text="4" leading-none>
        {{ label }}
      </div>
    </div>
    <div h-4 leading-none text-comment>
      <slot>
        <CommonIcon v-if="arrow" name="i-ph-caret-right" size="16" />
        <template v-if="!arrow && value">
          {{ value }}
        </template>
        <CommonIcon v-if="!arrow && to" name="i-ph-arrow-square-out" size="16" text="caption hover:primary" cursor-pointer />
      </slot>
    </div>
  </div>
</template>
