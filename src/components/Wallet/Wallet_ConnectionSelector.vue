<template>
  <div class="wallet__connection-selector">
    <div class="wallet__connection-selector__contents">
      <Icon
        :icon="icon.type"
        :color="icon.color"/>
      <h2>{{ title }}</h2>
      <div>-></div>
    </div>
  </div>
</template>

<script>

import Icon from '@/components/_core/Icon.vue'

export default {
  name: 'wallet--connection-selector',

  components: {
    Icon
  },

  props: {
    title: {
      type: String,
      required: false,
      default: '*wallet type*'
    },

    icon: {
      type: Object,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .wallet__connection-selector {
    height: 7.5rem;
    position: relative;
    border: 1px solid transparent;

    .wallet__connection-selector__contents {
      pointer-events: none;
      display: flex;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding: 0 1.5rem;
      width: 100%;

      .icon {
        width: 64px;
      }

      h2 {
        flex: 1;
        padding: 0 1.5rem;
        margin: {
          top: 1rem;
        }
      }

      .arrow {
        width: 64px;
      }
    }

    &:hover {
      border: 1px solid #363944;
      border-radius: 15px;
    }
  }
</style>
