<script lang="ts" setup>
const props = withDefaults(defineProps<{
  className?: string
  type?: 'text' | 'password'
  placeholder?: string
  icon?: string
  maxLength?: number
  showWordLimit?: boolean
  allowClear?: boolean
  loading?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: boolean
}>(), {
  type: 'text',
  maxLength: 0,
})

const modelValue = defineModel<string>({ default: '' })
const isEmpty = computed(() => modelValue.value === '')
const wordCount = computed(() => modelValue.value.length)
const hasError = computed(() => props.error || (props.showWordLimit && wordCount.value > props.maxLength))
const visiblePassword = ref(false)
</script>

<template>
  <div
    class="input"
    :class="{
      [`${className}`]: className,
      [`is-${type}`]: type,
      'is-error': hasError,
      'is-disabled': disabled || loading,
      'is-readonly': readonly,
      'is-loading': loading,
      'has-icon': $slots.prepend || icon,
      'has-clear': allowClear,
    }"
  >
    <div class="input__prepend">
      <slot name="prepend">
        <i v-if="loading" class="input__icon" :class="{ 'is-empty': isEmpty, 'i-svg-spinners-90-ring-with-bg': loading }" />
        <i
          v-if="!loading || icon"
          class="input__icon"
          :class="{ 'is-empty': isEmpty, [`${icon}`]: icon && !loading, 'text-danger': hasError }"
        />
      </slot>
    </div>
    <div class="input__append">
      <div v-if="allowClear && !isEmpty" class="input__clear" @click="modelValue = ''">
        <CommonIcon name="i-ph-x" size="20" />
      </div>
      <i
        v-if="type === 'password'"
        class="text-20px"
        :class="visiblePassword ? 'i-ph-eye' : 'i-ph-eye-slash text-comment'"
        @click="visiblePassword = !visiblePassword"
      />
      <div v-if="showWordLimit" class="input__limit">
        {{ wordCount }}/{{ maxLength }}
      </div>
      <slot name="append" />
    </div>
    <input
      v-model="modelValue"
      :type="type === 'password' ? visiblePassword ? 'text' : 'password' : type"
      :placeholder="placeholder"
      :disabled="disabled || loading"
      :readonly="readonly"
    >
  </div>
</template>

<style scoped>
.input {
  position: relative;

  &.is-disabled {
    input:disabled {
      --at-apply: hover:op-80;
    }
  }

  &.is-readonly {
    input:read-only {
      --at-apply: outline-none;
    }
  }

  &__limit {
    --at-apply: text-15px;
  }

  &__clear {
    --at-apply: flex-(~ center) mt-2px h-24px w-24px rounded-full hover:bg-sider text-18px;
  }

  &__icon {
    --at-apply: text-20px;

    &.is-empty {
      --at-apply: op-80 text-comment;
    }
  }

  &__prepend {
    --at-apply: absolute top-50% left-4 z-10 translate-y-[-50%];
  }
  &__append {
    --at-apply: flex-(~ v-center) gap-x-2.5 absolute top-50% right-4 z-10 translate-y-[-50%] select-none leading-none;
  }

  &.is-loading,
  &.has-icon {
    input {
      padding-left: 45px;
    }
  }

  input {
    --at-apply:
      w-full h-24px px-4 py-[1.6rem] rounded outline-none placeholder:text-comment leading-none
      bg-inset op-80 hover:op-100 focus:op-100 focus:outline-primary/70
    ;
  }

  &.is-error {
    input {
      --at-apply: outline-danger text-danger placeholder:text-danger;
    }

    .input__limit {
      --at-apply: text-danger;
    }
  }
}
</style>
