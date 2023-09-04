<script lang="ts" setup>
const { data } = await getCollectionIcons()

const modelValue = defineModel<string>()

const keyword = ref('')
const selectedGroup = ref(0)
const selectedIcon = ref(
  modelValue.value ? modelValue.value : data.value ? `${data.value[0].name}:${data.value[0].icons[0]}` : '',
)

modelValue.value = selectedIcon.value

const resolvedIcons = computed(() => {
  return data.value?.find((_, i) => i === selectedGroup.value)?.icons
    .filter(i => keyword.value ? i.toLowerCase().includes(keyword.value.toLowerCase()) : true)
    .map(i => `${data.value?.[selectedGroup.value].name}:${i}`)
})

watch(selectedIcon, (newVal) => {
  modelValue.value = newVal
})

function onGroupSelected(index: number) {
  const currentGroup = data.value?.find((_, i) => i === index)
  selectedGroup.value = index
  selectedIcon.value = `${currentGroup?.name}:${currentGroup?.icons[0]}`
}

function onIconSelected(icon: string) {
  selectedIcon.value = icon
}
</script>

<template>
  <VDropdown placement="bottom-start" :skidding="-15">
    <CommonIcon :name="selectedIcon" size="20" class="cursor-pointer text-primary/80 hover:text-primary" />

    <template #popper>
      <div>
        <header flex="~ v-center gap-x-3" p="x-5 y-3" border="b base">
          <CommonIcon name="i-ph-magnifying-glass" size="20" class="text-comment" />
          <input v-model="keyword" type="text" placeholder="Search" class="w-full border-none bg-transparent placeholder:text-comment outline-none">
        </header>
        <main grid="~ cols-8 sm:cols-8 gap-1.5 sm:gap-3" p="5">
          <template v-for="icon in resolvedIcons" :key="icon">
            <CommonIcon
              :name="icon"
              size="24"
              class="p-2 hover:(text-light bg-primary/90)"
              :class="icon === selectedIcon ? 'text-light bg-primary' : ''"
              cursor-pointer rounded
              @click="onIconSelected(icon)"
            />
          </template>
        </main>
        <footer flex="~ v-center gap-x-5" p="x-5 y-3" border="t base">
          <template v-for="(group, index) in data" :key="index">
            <CommonIcon
              :name="`${group.name}:${group.icons[0]}`"
              :class="index === selectedGroup ? 'text-primary' : ''"
              size="24"
              cursor-pointer
              @click="onGroupSelected(index)"
            />
          </template>
        </footer>
      </div>
    </template>
  </VDropdown>
</template>
