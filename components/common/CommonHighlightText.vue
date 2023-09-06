<script lang="ts" setup>
const props = defineProps<{
  content: string
  keyword: string
}>()

const words = computed<{ list: string[]; keyword?: string }>(() => {
  const { content, keyword } = props

  if (!content)
    return { list: [] }
  if (typeof content !== 'string' || !keyword)
    return { list: [content] }

  const re = new RegExp(keyword, 'i')
  const splitKeyword = content.match(re)?.[0]

  return {
    list: content.split(splitKeyword || ''),
    keyword: splitKeyword,
  }
})

function VNode() {
  return h(
    'span',
    words.value.list.map((item, index) => {
      return !index
        ? item
        : words.value.keyword ? [h('mark', { class: 'hl-txt' }, words.value.keyword), item] : item
    }),
  )
}
</script>

<template>
  <VNode />
</template>

<style>
.hl-txt {
  --at-apply: text-primary bg-transparent;
}
</style>
