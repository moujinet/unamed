<script lang="ts" setup>
import { hideAllPoppers } from 'floating-vue'

definePageMeta({
  middleware: 'auth',
})

const editId = ref(0)
const modal = useModal('collection.form')
const toast = useToast()
const { data: collections, refresh, pending } = await getCollections()
const { hasUserPermission, hasDeletePermission } = useAuth()

function handleEdit(id: number) {
  editId.value = id
  modal.value = true
  hideAllPoppers()
}

async function handleDelete(id: number) {
  if (await deleteCollection(id)) {
    toast.success({ title: 'Successful' })
    refresh()
  }
}
</script>

<template>
  <ContentView title="Collections" icon="i-ph-stack">
    <template #header>
      <CollectionFormModal
        :id="editId"
        :title="editId ? 'Edit Collection' : 'New Collection'"
        :icon="editId ? 'i-ph-folder-simple' : 'i-ph-folder-simple-plus'"
        placement="bottom"
        @close="editId = 0"
        @success="refresh"
      >
        <CommonButton
          color="primary"
          type="solid"
          size="sm"
          icon="i-ph-folder-simple-plus"
        >
          New Collection
        </CommonButton>
      </CollectionFormModal>
    </template>

    <CommonLoading :loading="pending" text="Loading..." />

    <div
      grid="~ cols-2 xl:cols-3 2xl:cols-4"
      gap-6
    >
      <CommonCard
        v-for="collection in collections"
        :key="collection.id"
        class="ring-primary hover:ring-2"
        group
      >
        <div
          flex="~ justify-between"
          p="x-6 y-5"
        >
          <NuxtLink
            :to="`/bookmarks/${collection.id}`"
            flex="~ col sm:row sm:v-center"
            gap="x-6"
          >
            <div pb-2>
              <CommonIcon :name="collection.icon" size="auto" class="text-12 group-hover:text-primary" />
            </div>
            <h2 text="caption" font-bold>
              {{ collection.name }}
              <div text="sm comment">
                {{ formatDate(collection.created_at) }}
              </div>
            </h2>
          </NuxtLink>
          <div flex="~ v-center gap-x-3" h-6>
            <!-- <CommonIcon name="i-ph-push-pin-simple" class="text-comment" /> -->
            <CommonDropdown>
              <CommonDropdownItem
                v-if="hasUserPermission(collection.author_id)"
                label="Edit Collection"
                icon="i-ph-pencil"
                @click="handleEdit(collection.id)"
              />
              <CommonDropdownItem v-else label="You are not owner" icon="i-ph-info" :link="false" />
              <CommonPopover
                v-if="hasDeletePermission()"
                color="danger"
                question="Are you sure want to delete?"
                confirm-text="Delete Collection"
                icon="i-ph-trash"
                @confirm="handleDelete(collection.id)"
              >
                <CommonDropdownItem label="Delete" icon="i-ph-trash" danger />
              </CommonPopover>
              <div v-if="hasUserPermission(collection.author_id)" border="b base" my-2 />
              <CommonDropdownItem label="Statistics" icon="i-ph-activity" />
            </CommonDropdown>
          </div>
        </div>
      </CommonCard>
    </div>
  </ContentView>
</template>
