<script lang="ts" setup>
defineProps<{
  placeholder?: string
  disabled?: boolean
  allowClear?: boolean
}>()

const tags = defineModel<string[]>('modelValue', { default: [] })
const inputValue = ref('')
const inputRef = ref()
const suggestions = ref<string[]>([])
const suggestionSelected = ref('')
const { focused } = useFocus(inputRef)

const isEmpty = computed(() => tags.value.length === 0 && inputValue.value === '')
const resolvedSuggestions = computed(() => suggestions.value.filter(tag => !tags.value.includes(tag)))

const getDebouncedTags = useDebounceFn(async (search?: string) => {
  const { code, data } = await getTags(search)

  if (code.value === SUCCESS)
    return data.value?.map(tag => tag.name)

  return []
}, 500)

function addTag(tag: string) {
  if (!tags.value.includes(tag))
    tags.value.push(tag)
}

async function handleInputChange(e: any) {
  if (['Enter'].includes(e.key)) {
    if (suggestionSelected.value)
      addTag(suggestionSelected.value)
    else if (inputValue.value && inputValue.value.trim() !== '' && !tags.value.includes(inputValue.value))
      addTag(inputValue.value.trim())

    inputValue.value = ''
    suggestionSelected.value = ''
  }

  if (['Backspace'].includes(e.key)) {
    if (inputValue.value === '')
      tags.value.pop()
  }

  if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
    const current = suggestionSelected.value
      ? resolvedSuggestions.value.indexOf(suggestionSelected.value)
      : 0

    if (e.key === 'ArrowUp') {
      suggestionSelected.value = current === 0
        ? resolvedSuggestions.value[resolvedSuggestions.value.length - 1]
        : resolvedSuggestions.value[current - 1]
    }
    else {
      suggestionSelected.value = current === resolvedSuggestions.value.length - 1
        ? resolvedSuggestions.value[0]
        : resolvedSuggestions.value[current + 1]
    }

    return
  }

  if (inputValue.value.length > 1) {
    const tags = await getDebouncedTags(inputValue.value)

    if (tags) {
      suggestions.value = tags
      suggestionSelected.value = resolvedSuggestions.value[0]
    }
    else {
      suggestions.value = []
    }
  }
  else {
    suggestions.value = []
  }
}

function handleSuggestionClick(tag: string) {
  tags.value.push(tag)
  inputValue.value = ''
  suggestions.value = []
}

function handleClearAll() {
  inputValue.value = ''
  tags.value = []
  suggestions.value = []
}

function handleTagClose(tag: string) {
  tags.value.findIndex(t => t === tag) > -1 && tags.value.splice(tags.value.findIndex(t => t === tag), 1)
}
</script>

<template>
  <div relative>
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
            <CommonTag
              v-if="index < 4"
              :label="index === 3 ? `${(tags.length - 3).toString()} more` : tag"
              :closeable="index < 3"
              @close="handleTagClose"
            />
          </template>
        </div>
        <div class="input-tag__input">
          <input
            ref="inputRef"
            v-model="inputValue"
            type="text"
            :data-suggestion="suggestionSelected"
            :placeholder="placeholder"
            :disabled="disabled"
            @keydown="handleInputChange"
          >
        </div>
      </div>
      <div v-if="allowClear" class="input-tag__clear">
        <CommonIcon v-show="!isEmpty" name="i-ph-x" size="20" class="hover:text-caption" @click.stop="handleClearAll" />
      </div>
    </div>
    <div
      v-if="resolvedSuggestions.length > 0"
      class="input-tag__autocomplete"
    >
      <div
        v-for="(suggestion, index) in resolvedSuggestions"
        :key="index"
        class="input-tag__autocomplete--item"
        :class="suggestionSelected === suggestion ? 'is-active' : ''"
        @click="handleSuggestionClick(suggestion)"
      >
        <CommonHighlightText :content="suggestion" :keyword="inputValue" />
      </div>
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
      --at-apply: w-100px text-4 leading-none outline-none bg-transparent placeholder:text-comment;
    }
  }

  &__clear {
    --at-apply: flex-(~ v-center gap-x-1);
  }

  &__autocomplete {
    --at-apply: absolute z-10 mt-1 w-full rounded bg-inset-active;

    &--item {
      --at-apply: px-4 py-3 hover:text-caption hover:bg-sider;

      &.is-active {
        --at-apply: text-caption bg-sider;
      }
    }
  }
}
</style>
