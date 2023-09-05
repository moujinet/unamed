<script lang="ts" setup>
const props = withDefaults(defineProps<{
  id?: number
  icon?: string
  title?: string
  placement?: string
  hiddenTooltip?: boolean
}>(), {
  placement: 'right',
})

const emit = defineEmits(['success', 'close'])
const modal = useModal('tag.form')
const isEditable = computed(() => props.id !== undefined && props.id > 0)
const tagName = ref('')
const toast = useToast()

// Reset form
watch(modal, async (newVal) => {
  if (newVal) {
    if (isEditable.value) {
      const { data: tag } = await getTag(props.id!)

      if (tag) {
        tagName.value = tag.value?.name || ''
      }
      else {
        modal.value = false
        toast.error({ title: 'Tag not found' })
      }
    }
    else {
      tagName.value = ''
    }
  }
})

async function handleSubmit() {
  if (tagName.value.trim() === '')
    return toast.error({ title: 'Tag name is required' })

  const { code } = isEditable.value
    ? await updateTag(props.id!, tagName.value)
    : await createTag(tagName.value)

  if (code.value === SUCCESS) {
    emit('success')
    emit('close')
    modal.value = false
    toast.success({ title: 'Successful' })
  }
}
</script>

<template>
  <CommonTooltip :content="title" :placement="placement" :disabled="hiddenTooltip" @click="modal = true">
    <slot />
  </CommonTooltip>

  <CommonModal
    v-model:visible="modal"
    :icon="icon"
    :title="title"
    ok-text="Create"
    @ok="handleSubmit"
    @close="emit('close')"
  >
    <div flex="~ col gap-y-4">
      <CommonFormItem label="Tag Name" required>
        <CommonInput v-model="tagName" placeholder="Please input tag" @keyup.enter="handleSubmit" />
      </CommonFormItem>
    </div>
  </CommonModal>
</template>
