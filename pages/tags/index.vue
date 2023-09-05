<script lang="ts" setup>
import { hideAllPoppers } from 'floating-vue'

definePageMeta({
  middleware: 'auth',
})

const toast = useToast()
const modal = useModal('tag.form')
const { hasUserPermission, hasDeletePermission } = useAuth()

const editId = ref(0)
const { data: tags, refresh, pending } = await getTags()

function handleEdit(id: number) {
  editId.value = id
  modal.value = true
  hideAllPoppers()
}

async function handleDelete(id: number) {
  if (await deleteTag(id)) {
    toast.success({ title: 'Successful' })
    refresh()
  }
}
</script>

<template>
  <ContentView title="Tags" icon="i-ph-hash">
    <template #header>
      <TagFormModal
        :id="editId"
        :title="editId ? 'Edit Tag' : 'New Tag'"
        icon="i-ph-hash"
        placement="bottom"
        @close="editId = 0"
        @success="refresh"
      >
        <CommonButton
          color="primary"
          type="solid"
          size="sm"
          icon="i-ph-hash"
        >
          New Tag
        </CommonButton>
      </TagFormModal>
    </template>

    <CommonLoading :loading="pending" text="Loading..." />

    <div
      grid="~ cols-2 md:cols-3 lg:cols-4 xl:cols-5 2xl:cols-6"
      gap-6
    >
      <CommonCard
        v-for="tag in tags"
        :key="tag.id"
        class="ring-primary hover:ring-2"
        group
      >
        <div
          flex="~ justify-between"
          p="x-4 y-3"
        >
          <NuxtLink flex="~ v-center gap-x-3">
            <CommonIcon name="i-ph-tag" />
            {{ tag.name }}
          </NuxtLink>

          <CommonDropdown>
            <CommonDropdownItem
              v-if="hasUserPermission(tag.author_id)"
              label="Edit Tag"
              icon="i-ph-pencil"
              @click="handleEdit(tag.id)"
            />
            <CommonPopover
              v-if="hasDeletePermission()"
              color="danger"
              question="Are you sure want to delete?"
              confirm-text="Delete Tag"
              icon="i-ph-trash"
              @confirm="handleDelete(tag.id)"
            >
              <CommonDropdownItem label="Delete" icon="i-ph-trash" danger />
            </CommonPopover>
          </CommonDropdown>
        </div>
      </CommonCard>
    </div>
  </ContentView>
</template>
