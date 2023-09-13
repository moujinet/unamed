<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import type { NuxtError } from '#app'

const { error } = defineProps<{
  error: Partial<NuxtError>
}>()

const { t } = useI18n()

const errorCodes: Record<number, string> = {
  404: t('errors.common.not-found'),
}

const state = ref<'error' | 'reloading'>('error')
const message = error.message ?? errorCodes[error.statusCode!] ?? t('errors.common.default-message')

async function reload() {
  state.value = 'reloading'

  try {
    clearError({
      redirect: '/',
    })
  }
  catch (err) {
    console.error(err)
    state.value = 'error'
  }
}
</script>

<template>
  <main grid="~" place="items-center" h-full>
    <div flex="~ col h-center">
      <div flex="~ col sm:row sm:gap-x-8 sm:v-center gap-y-4">
        <ErrorImage v-if="isHydrated" />
        <div lt-sm:mt-4 lt-sm:text-center>
          <h1 text="4xl caption" font-bold tracking-tighter uppercase>
            {{ isHydrated ? $t('errors.common.title') : '' }}
          </h1>
          <div mt-2 font-bold uppercase>
            {{ isHydrated ? message : '' }}
          </div>
        </div>
      </div>

      <div v-if="isHydrated" flex="~ center gap-x-4" mt-8>
        <CommonButton color="primary" :loading="state === 'reloading'" :auto="false" @click="reload">
          {{ state === 'reloading' ? $t('common.actions.reloading') : $t('common.actions.reload') }}
        </CommonButton>
      </div>
    </div>
  </main>
</template>
