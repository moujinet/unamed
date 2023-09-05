<script lang="ts" setup>
const emit = defineEmits(['upload'])
const uploader = ref()
const toast = useToast()
function handleUploaderClick() {
  uploader.value.click()
}

async function handleUploaderChange(e: any) {
  const files = e.target.files
  const formData = new FormData()
  formData.append('file', files[0])

  const { message, code, data } = await useFetchAPI<string>('/api/user/avatar/upload', {
    method: 'post',
    body: formData,
  })

  if (code.value === SUCCESS) {
    toast.success({ title: 'Successful' })
    emit('upload', data.value)
  }
  else {
    toast.error({ description: message.value })
  }
}
</script>

<template>
  <div @click="handleUploaderClick">
    <slot />
    <input ref="uploader" type="file" name="file" class="hidden" @change="handleUploaderChange">
  </div>
</template>
