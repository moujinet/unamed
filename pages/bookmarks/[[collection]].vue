<script lang="ts" setup>
import { hideAllPoppers } from 'floating-vue'

const editId = ref(0)
const loginModal = useModal('user.login.form')
const bookmarkModal = useModal('bookmark.form')
const { isLoggedIn } = useSession()

const toast = useToast()
const route = useRoute()
const collectionId = route.params.collection ? Number.parseInt(String(route.params.collection)) : 0

const { data: bookmarks, refresh, pending } = await getBookmarks(collectionId)

function handleEdit(id: number) {
  editId.value = id
  bookmarkModal.value = true
  hideAllPoppers()
}

async function handleDelete(id: number) {
  if (await deleteBookmark(id)) {
    toast.success({ title: 'Successful' })
    refresh()
  }
}
</script>

<template>
  <ContentView title="Bookmarks" icon="i-ph-bookmarks" hidden-back>
    <template #header>
      <template v-if="isLoggedIn">
        <BookmarkFormModal
          v-if="isHydrated"
          :id="editId"
          :title="editId ? 'Edit Bookmark' : 'New Bookmark'"
          icon="i-ph-bookmark-simple"
          placement="bottom"
          @success="refresh"
          @close="editId = 0"
        >
          <CommonButton
            color="primary"
            type="solid"
            size="sm"
            icon="i-ph-bookmark-simple"
          >
            New Bookmark
          </CommonButton>
        </BookmarkFormModal>
      </template>

      <template v-else>
        <CommonTooltip v-if="isHydrated" content="User Login" placement="right" @click="loginModal = true">
          <CommonButton
            color="primary"
            type="plain"
            size="lg"
            class-name="py-1!"
            icon="i-ph-user-circle text-6"
            block
          />
        </CommonTooltip>
      </template>
    </template>

    <div
      grid="~ cols-1 md:cols-2 xl:cols-3 2xl:cols-4"
      gap-6
    >
      <BookmarkCard
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        :bookmark="bookmark"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <CommonLoading :loading="pending" text="Loading..." />
  </ContentView>
</template>
