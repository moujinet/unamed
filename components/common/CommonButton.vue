<script lang="ts" setup>
withDefaults(defineProps<{
  type?: 'plain' | 'solid' | 'fill'
  shape?: 'square' | 'circle'
  size?: 'sm' | 'md' | 'lg' | 'none'
  color?: 'primary' | 'danger'
  icon?: string
  className?: string
  block?: boolean
  dashed?: boolean
  loading?: boolean
  disabled?: boolean
  auto?: boolean
}>(), {
  type: 'fill',
  shape: 'square',
  size: 'md',
  auto: true,
})
</script>

<template>
  <button
    class="btn"
    :class="{
      [`is-${type}`]: type,
      [`is-${shape}`]: shape,
      [`is-${size}`]: size,
      [`is-${color}`]: color,
      'is-loading': loading,
      'is-dashed': dashed && type === 'solid',
      'is-block': block && shape !== 'circle',
      'is-auto': auto,
      'has-icon': icon || loading,
      [`${className}`]: className,
    }"
    :disabled="disabled || loading"
  >
    <CommonIcon
      v-if="icon || loading"
      :name="loading ? 'i-svg-spinners-90-ring-with-bg' : icon"
      :class="{
        'text-16px': size === 'sm',
        'text-18px': size === 'md',
        'text-20px': size === 'lg',
      }"
    />
    <span v-if="$slots.default && shape !== 'circle'" :class="(icon || loading) && auto ? 'hidden lg:inline' : ''">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.btn {
  --at-apply: flex-(~ center) gap-x-3 text-caption leading-none;

  &:disabled {
    --at-apply: cursor-not-allowed op-70 hover:op-70 active:op-70;
  }

  &.is-block {
    --at-apply: w-full;
  }

  &.is-square {
    --at-apply: rounded;
  }
  &.is-circle {
    --at-apply: rounded-full;
  }

  &.is-none {
    --at-apply: p-0 text-4;
  }
  &.is-sm {
    --at-apply: p-(x4 y2) text-3;
  }
  &.is-md {
    --at-apply: p-(x5 y3) text-4;
  }
  &.is-lg {
    --at-apply: p-(x6 y4) text-4.5;
  }
  &.is-sm,
  &.is-md,
  &.is-lg {
    &.is-block {
      --at-apply: px-0;
    }
  }

  &.is-plain {
    --at-apply: bg-transparent hover:op-70 active:op-100;

    &.is-primary {
      --at-apply: text-primary hover:text-primary/90 active:text-primary;

      &:disabled {
        --at-apply: text-primary/50;
      }
    }
    &.is-danger {
      --at-apply: text-danger;

      &:disabled {
        --at-apply: text-danger/50;
      }
    }
  }
  &.is-solid {
    --at-apply: bg-transparent border-(1 solid base) hover:border-hover active:border-active;

    &:disabled {
      --at-apply: border-active text-comment;
    }

    &.is-dashed {
      --at-apply: border-dashed;
    }

    &.is-primary {
      --at-apply: text-primary border-primary hover:border-primary/75 active:border-primary;

      &:disabled {
        --at-apply: border-primary;
      }
    }
    &.is-danger {
      --at-apply: text-danger border-danger hover:border-danger/75 active:border-danger;

      &:disabled {
        --at-apply: border-danger;
      }
    }
  }
  &.is-fill {
    --at-apply: bg-inset hover:bg-inset-hover active:bg-inset-active;

    &:disabled {
      --at-apply: text-comment bg-inset;
    }

    &.is-primary {
      --at-apply: text-light bg-primary hover:bg-primary/90 active:bg-primary;

      &:disabled {
        --at-apply: text-light bg-primary;
      }
    }
    &.is-danger {
      --at-apply: text-light bg-danger hover:bg-danger/90 active:bg-danger;

      &:disabled {
        --at-apply: text-light bg-danger;
      }
    }
  }
}
</style>
