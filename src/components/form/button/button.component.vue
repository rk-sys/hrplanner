<script setup lang="ts">
const props = defineProps({
  buttonType: {
    type: String,
    default: 'filled',
    validator(value: string) {
      return ['filled', 'ghost', 'borderless'].includes(value)
    },
  },
  buttonState: {
    type: String,
    default: 'primary',
    validator(value: string) {
      return ['primary', 'second', 'danger', 'success'].includes(value)
    },
  }
})
</script>

<template>
  <button
      class="rounded-none w-full py-3 uppercase outline-none hover:outline-none focus:outline-none text-white font-semibold text-center disabled:opacity-75"
      :class="[buttonState, buttonType]">
    <slot/>
  </button>
</template>

<style lang="scss"
       scoped>

.primary {
  &.filled {
    @apply bg-primary-500 border border-primary-500 hover:border-primary-500/80 hover:bg-primary-500/80
  }

  &.ghost {
    @apply border-primary-500
  }

  &.borderless {
    @apply border-transparent
  }

  &.ghost,
  &.borderless {
    @apply hover:text-white hover:bg-primary-500 text-black
  }
}

.second {
  &.filled {
    @apply bg-white text-black border-gray-100 border hover:bg-gray-100/80 dark:bg-white dark:hover:bg-white/90
  }

  &.ghost {
    @apply border-solid border border-gray-100
  }

  &.borderless {
    @apply border-transparent
  }

  &.ghost,
  &.borderless {
    @apply bg-transparent text-black hover:bg-gray-100 dark:hover:text-black
  }
}

.success {
  &.filled {
    @apply bg-green-500 border border-green-500 hover:bg-green-500/80 hover:border-green-500/80;
  }

  &.ghost {
    @apply border-green-500;
  }

  &.borderless {
    @apply hover:border-green-500 border-transparent;
  }

  &.ghost,
  &.borderless {
    @apply text-black hover:bg-green-500 hover:text-white
  }
}

.danger {
  &.filled {
    @apply bg-rose-500 border border-rose-500/80 hover:bg-rose-500/80 hover:border-rose-500/80
  }

  &.ghost {
    @apply border-rose-500;
  }

  &.borderless {
    @apply border-transparent hover:border-rose-500;
  }

  &.ghost,
  &.borderless {
    @apply text-black hover:text-white hover:bg-rose-500
  }
}

.primary,
.danger,
.success {
  &.ghost,
  &.borderless {
    @apply bg-transparent border-solid border
  }
}
</style>
