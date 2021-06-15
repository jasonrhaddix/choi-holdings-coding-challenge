<template>
  <div :class="['app-button', { 'disabled': disabled }]">
    <div class="app-button__content">
      <p>{{ label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-button',

  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-button {
    cursor: pointer;
    height: 48px;
    min-width: 125px;
    border-radius: 48px;
    margin: 0.5rem;
    background: {
      color: #3772FF;
    }

    .app-button__content {
      pointer-events: none;
      padding: 0 1.5rem;
      margin: {
        top: 12px
      }

      p {
        color: white;
        padding: 0;
        margin: 0;
        font-size: 1.1rem;
        font-weight: 500;
        text-align: center;
        width: 100%;
      }
    }

    &.disabled {
      pointer-events: none;
      background: {
        color: #363944;
      }

      p {
        color: #777e91;
      }
    }
  }
</style>
