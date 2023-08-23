<script lang="ts" setup>
interface SelectOption {
  icon?: string
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  options: SelectOption[]
  className?: string
  icon?: string
  placeholder?: string
  multiple?: boolean
  loading?: boolean
  disabled?: boolean
  allowClear?: boolean
  error?: boolean
  limit?: number
}>(), {
  limit: 0,
})

const modelValue = defineModel<string[]>({ default: [] })
const isEmpty = computed(() => modelValue.value.length === 0 || modelValue.value.every(v => v === ''))

const currentOption = computed(() => {
  const opt = props.options.find(opt => modelValue.value.includes(opt.value))
  return opt || { label: props.placeholder, icon: props.icon, value: undefined }
})

const opened = ref(false)
const dropdownRef = ref(null)

function handleToggle() {
  if (props.disabled || props.loading)
    return
  opened.value = !opened.value
}

function handleOptionSelected(value: string) {
  if (!props.multiple) {
    modelValue.value = [value]
    setTimeout(() => opened.value = false, 200)
  }
  else {
    if (modelValue.value.includes(value))
      modelValue.value = modelValue.value.filter(v => v !== value)
    else
      props.limit > modelValue.value.length && modelValue.value.push(value)
  }
}

function handleClear() {
  modelValue.value = []
}

onClickOutside(dropdownRef, () => {
  opened.value = false
})
</script>

<template>
  <div relative w-full>
    <div
      class="select"
      :class="{
        [`${className}`]: className,
        'is-multiple': multiple,
        'is-loading': loading,
        'is-disabled': disabled || loading,
        'is-empty': isEmpty,
        'is-error': error,
        'is-dropdown-open': opened,
        'has-clear': allowClear,
        'has-icon': icon,
      }"
      @click="handleToggle"
    >
      <div class="select__label">
        <CommonIcon v-if="icon" :name="currentOption.icon" class="select__icon" />
        {{ currentOption.label }}
      </div>
      <div class="select__append">
        <div v-if="allowClear && !isEmpty" class="select__clear" @click.stop="handleClear">
          <CommonIcon name="i-fluent-dismiss-20-regular" />
        </div>
        <CommonIcon :name="loading ? 'i-svg-spinners-90-ring-with-bg' : 'i-fluent-chevron-up-down-20-regular'" />
      </div>
    </div>
    <TransitionSlide :offset="[0, -20]">
      <div v-if="opened" ref="dropdownRef" class="select__dropdown">
        <div
          v-for="option in options"
          :key="option.value"
          class="select__option"
          :class="{ 'is-checked': modelValue.includes(option.value) }"
          @click="handleOptionSelected(option.value)"
        >
          <div class="select__option--label">
            <CommonIcon :name="option.icon" />
            <span>{{ option.label }}</span>
          </div>
          <div v-if="modelValue.includes(option.value)" class="select__option--checked">
            <CommonIcon name="i-fluent-checkmark-20-regular" />
          </div>
        </div>
      </div>
    </TransitionSlide>
  </div>
</template>

<style scoped>
.select {
  --at-apply: flex-(~ v-center justify-between) px-4 py-14px leading-20px select-none rounded bg-inset op-90 hover:op-100 focus:op-100;

  &__icon {
    --at-apply: text-20px;
  }

  &__label {
    --at-apply: flex-(~ v-center gap-x-3);
  }

  &__append {
    --at-apply: flex-(~ v-center gap-x-3);
  }

  &__clear {
    --at-apply: flex-(~ center) h-20px w-20px rounded-full hover:bg-sider text-16px leading-none;
  }

  &__dropdown {
    --at-apply: absolute mt-1 w-full rounded bg-inset border-(1 base) py-2 z-20 shadow;
  }

  &__option {
    --at-apply: flex-(~ v-center justify-between) px-4 py-2.5 hover:text-caption select-none;

    &.is-checked {
      --at-apply: text-primary;
    }

    &--label {
      --at-apply: flex-(~ v-center gap-x-3) leading-20px;

      &-icon {
        --at-apply: text-16px leading-none;
      }
    }

    &--checked {
      --at-apply: text-(primary 18px) leading-none;
    }
  }

  &.is-empty {
    --at-apply: text-comment;
  }
}
</style>
