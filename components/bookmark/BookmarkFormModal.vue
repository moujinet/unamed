<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import type { IOption } from '~/types'
import type { IBookmarkFormData } from '~/services/bookmark'

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

const modal = useModal('bookmark.form')
const bookmark = reactive<IBookmarkFormData>({
  collection_id: 0,
  icon: '',
  url: '',
  name: '',
  description: '',
  tags: [],
})
const showOptional = ref<boolean>(false)
const loading = ref<boolean>(false)
const fetching = ref<boolean>(false)
const collections = ref<IOption<string>[]>([])
const toast = useToast()
const collectionId = ref<string>(bookmark.collection_id.toString())
const isEditable = computed(() => props.id !== undefined && props.id > 0)

watch(collectionId, () => {
  bookmark.collection_id = Number.parseInt(collectionId.value)
})

// Reset form
watch(modal, async (newVal) => {
  if (newVal) {
    collections.value = await getCollectionsOptions()

    if (isEditable.value) {
      const { data } = await getBookmark(props.id!)

      bookmark.icon = data.value?.icon || ''
      bookmark.url = data.value?.url || ''
      bookmark.collection_id = data.value?.collection_id || 0
      bookmark.name = data.value?.name || ''
      bookmark.description = data.value?.description || ''
      bookmark.tags = data.value?.tags ? data.value.tags.map(tag => tag.tag!.name) : []

      collectionId.value = bookmark.collection_id.toString()

      showOptional.value = true
    }
    else {
      resetForm()
    }
  }
})

function resetForm() {
  collectionId.value = ''
  bookmark.icon = ''
  bookmark.url = ''
  bookmark.collection_id = 0
  bookmark.name = ''
  bookmark.description = ''
  bookmark.tags = []
  showOptional.value = false
}

const loadBookmarkMetaDeFn = useDebounceFn(async (url: string) => {
  const meta = await loadBookmarkMeta(url)

  bookmark.name = meta.name
  bookmark.description = meta.description
  bookmark.icon = meta.icon

  showOptional.value = true
  fetching.value = false
}, 300)

async function handleUrlChange() {
  fetching.value = true

  const isUrl = /^(?:https?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/g.test(bookmark.url)
  if (!isUrl) {
    fetching.value = false
    return
  }

  loadBookmarkMetaDeFn(bookmark.url)
}

async function handleSubmit() {
  if (bookmark.url.trim() === '')
    return toast.error({ title: t('common.messages.required', { name: t('bookmark.form.url') }) })
  if (bookmark.collection_id === 0)
    return toast.error({ title: t('common.messages.required', { name: t('bookmark.form.collection') }) })

  if (bookmark.name.trim() === '')
    handleUrlChange()

  showOptional.value = true

  const { code, error } = isEditable.value
    ? await updateBookmark(props.id!, bookmark)
    : await createBookmark(bookmark)

  if (code.value === SUCCESS) {
    emit('success')
    emit('close')

    if (isEditable.value)
      modal.value = false

    return toast.success({ title: t('common.messages.success'), afterAction: () => resetForm() })
  }

  return toast.error({
    title: t('common.messages.failed'),
    description: t(error.value?.message ?? ''),
  })
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
    :loading="loading"
    :ok-text="isEditable ? $t('common.actions.update') : $t('common.actions.create')"
    @ok="handleSubmit"
    @close="emit('close')"
  >
    <div flex="~ col gap-y-4">
      <CommonFormItem v-if="bookmark.icon" :label="$t('bookmark.form.icon')">
        <NuxtImg :src="bookmark.icon" preset="favicon" loading="lazy" class="h-12 w-12 rounded-lg" />
      </CommonFormItem>

      <CommonFormItem :label="$t('bookmark.form.collection')" required>
        <CommonSelect
          v-model="collectionId"
          :placeholder="$t('common.tips.select')"
          :options="collections"
          :disabled="collections.length === 0 || fetching"
        />
      </CommonFormItem>

      <CommonFormItem :label="$t('bookmark.form.url')" required>
        <CommonInput v-model="bookmark.url" :loading="fetching" :placeholder="$t('common.tips.example', { example: 'https://www.example.com' })" @change="handleUrlChange" />
      </CommonFormItem>

      <!--
      TODO : Add tags
      <CommonFormItem label="Tags">
        <CommonInputTag v-model="bookmark.tags" placeholder="Please enter" allow-clear />
      </CommonFormItem>
      -->

      <details :open="showOptional">
        <summary text="sm">
          {{ $t('common.actions.optional') }}
        </summary>

        <div flex="~ col gap-y-4" p="y-4">
          <CommonFormItem :label="$t('bookmark.form.name')">
            <CommonInput v-model="bookmark.name" :placeholder="$t('bookmark.tips.name')" />
          </CommonFormItem>
          <CommonFormItem :label="$t('bookmark.form.description')">
            <CommonInput v-model="bookmark.description" :placeholder="$t('bookmark.tips.description')" />
          </CommonFormItem>
        </div>
      </details>
    </div>
  </CommonModal>
</template>
