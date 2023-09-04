<script lang="ts" setup>
import type { IToast } from '~/composables/toast'

const toasts = useState<IToast[]>('toasts', () => ([]))

function handleClose(id: string) {
  toasts.value = toasts.value.filter(toast => toast.id !== id)
}
</script>

<template>
  <Teleport to="body">
    <ClientOnly>
      <div
        v-if="toasts.length > 0"
        flex="~ col gap-y-5"
        class="lt-sm:left-50% lt-sm:top-50% sm:bottom-5 sm:right-5 lt-sm:translate-x--50% lt-sm:translate-y--50%"
        fixed z-99999 transition-all
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          min-w-xs rounded shadow-lg
          flex="~ justify-between gap-x-3"
          :class="!toast.description ? 'flex-v-center' : ''"
          border="~ base"
          bg="card"
          p="5"
        >
          <div
            flex="~ gap-x-3"
            :class="!toast.description ? 'flex-v-center' : ''"
          >
            <CommonIcon v-if="toast.icon" :name="toast.icon" size="24" :class="toast.iconClass" />
            <div select-none>
              <div v-if="toast.title" :class="toast.titleClass">
                {{ toast.title }}
              </div>
              <div v-if="toast.description">
                {{ toast.description }}
              </div>
            </div>
          </div>
          <CommonIcon
            name="i-ph-x"
            size="20"
            class="cursor-pointer hover:text-caption text-comment"
            @click="handleClose(toast.id || '')"
          />
        </div>
      </div>
    </ClientOnly>
  </Teleport>
</template>
