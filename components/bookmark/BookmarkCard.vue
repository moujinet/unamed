<script lang="ts" setup>
import type { IBookmarkModel } from '~/types'

defineProps<{
  bookmark: IBookmarkModel
}>()

const emit = defineEmits(['edit', 'delete'])

function handleEdit(id: number) {
  emit('edit', id)
}

function handleDelete(id: number) {
  emit('delete', id)
}
</script>

<template>
  <CommonCard
    class="ring-primary hover:ring-2"
  >
    <div p-6>
      <div flex="~ justify-between">
        <NuxtLink
          flex="~ v-center gap-x-4"
          target="_blank"
          :to="bookmark.url"
        >
          <NuxtImg :src="bookmark.icon" preset="favicon" loading="lazy" width="32" height="32" />
          <h3 font="bold" text="caption ellipsis" line-clamp="1">
            {{ bookmark.name }}
          </h3>
        </NuxtLink>
        <CommonDropdown>
          <CommonDropdownItem
            :label="$t('bookmark.actions.edit')"
            icon="i-ph-pencil"
            @click="handleEdit(bookmark.id)"
          />
          <CommonPopover
            color="danger"
            :question="$t('common.questions.delete')"
            :confirm-text="$t('bookmark.actions.delete')"
            icon="i-ph-trash"
            @confirm="handleDelete(bookmark.id)"
          >
            <CommonDropdownItem :label="$t('common.actions.delete')" icon="i-ph-trash" danger />
          </CommonPopover>
        </CommonDropdown>
      </div>
      <div mt-4 text="sm" line-clamp="2">
        {{ bookmark.description }}
      </div>
    </div>
  </CommonCard>
</template>
