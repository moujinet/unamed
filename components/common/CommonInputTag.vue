<script lang="ts" setup>
defineProps<{
  placeholder?: string
  disabled?: boolean
  allowClear?: boolean
}>()

const tags = defineModel<string[]>('modelValue', { default: [] })
const inputValue = ref('')

const inputRef = ref()
const { focused } = useFocus(inputRef)

const isEmpty = computed(() => tags.value.length === 0 && inputValue.value === '')

function handleInputEnter() {
  if (inputValue.value && inputValue.value.trim() !== '' && !tags.value.includes(inputValue.value)) {
    tags.value.push(inputValue.value.trim())
    inputValue.value = ''
  }
}

function handleInputBackspace() {
  if (inputValue.value === '')
    tags.value.pop()
}

function handleClearAll() {
  inputValue.value = ''
  tags.value = []
}

function handleTagClose(tag: string) {
  tags.value.findIndex(t => t === tag) > -1 && tags.value.splice(tags.value.findIndex(t => t === tag), 1)
}
</script>

<template>
  <div
    class="input-tag"
    :class="{
      'is-focused': focused,
    }"
    @click="inputRef.focus()"
  >
    <div
      flex="~ v-center gap-x-1.5"
    >
      <slot name="prefix" />
      <div class="input-tag__tags">
        <template v-for="(tag, index) in tags" :key="index">
          <CommonTag :label="tag" closeable @close="handleTagClose" />
        </template>
      </div>
      <div class="input-tag__input">
        <input
          ref="inputRef"
          v-model="inputValue"
          type="text"
          :placeholder="placeholder"
          :disabled="disabled"
          @keydown.enter="handleInputEnter"
          @keydown.backspace="handleInputBackspace"
        >
      </div>
    </div>
    <div v-if="allowClear" class="input-tag__clear">
      <CommonIcon v-show="!isEmpty" name="i-ph-x" size="20" class="hover:text-caption" @click.stop="handleClearAll" />
    </div>
  </div>
</template>

<style scoped>
.input-tag {
  --at-apply: px-4 py-3 flex-(~ v-center justify-between) bg-inset op-80 hover:op-100 rounded;

  &.is-focused {
    --at-apply: op-100 ring-2 ring-primary/70;
  }

  &__tags {
    --at-apply: flex-(~ v-center gap-x-1) h-26px;
  }

  &__input {
    input {
      --at-apply: text-4 leading-none outline-none bg-transparent placeholder:text-comment;
    }
  }

  &__clear {
    --at-apply: flex-(~ v-center gap-x-1);
  }
}
</style>
