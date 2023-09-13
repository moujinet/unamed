<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

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
const { t } = useI18n()

const isEditable = computed(() => props.id !== undefined && props.id > 0)
const collection = reactive({
  name: '',
  icon: '',
})

const modal = useModal('collection.form')
const toast = useToast()

// Reset form
watch(modal, async (newVal) => {
  if (newVal) {
    if (isEditable.value) {
      const coll = await getCollection(props.id!)

      if (coll) {
        collection.name = coll.name
        collection.icon = coll.icon
      }
      else {
        modal.value = false
      }
    }
    else {
      collection.name = ''
      collection.icon = ''
    }
  }
})

async function handleSubmit() {
  if (collection.name.trim() === '')
    return toast.error({ title: t('common.messages.required', { name: t('collection.form.name') }) })

  const { code, error } = isEditable.value
    ? await updateCollection(props.id!, collection.name, collection.icon)
    : await createCollection(collection.name, collection.icon)

  if (code.value === SUCCESS) {
    emit('success')
    emit('close')
    modal.value = false
    toast.success({ title: t('common.messages.success') })
  }
  else {
    toast.error({
      title: t('common.messages.failed'),
      description: t(error.value?.message ?? ''),
    })
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
    :ok-text="$t('common.actions.create')"
    @ok="handleSubmit"
    @close="emit('close')"
  >
    <CommonFormItem :label="$t('collection.form.name')" required>
      <CommonInput v-model="collection.name" allow-clear @keyup.enter="handleSubmit">
        <template #prepend>
          <CommonIconPicker v-model="collection.icon" />
        </template>
      </CommonInput>
    </CommonFormItem>
  </CommonModal>
</template>
