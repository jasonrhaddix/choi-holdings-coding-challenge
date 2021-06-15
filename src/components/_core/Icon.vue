<template>
  <div
    class="icon"
    :style="iconStyles">
    <img :src="require(`@/assets/icon-${icon}.png`)" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    icon: {
      type: String,
      required: true
    },

    size: {
      type: Number,
      required: false,
      default: 64
    },

    color: {
      type: String,
      required: false,
      default: 'grey'
    }
  },

  setup (props) {
    const iconStyles = ref({
      backgroundColor: props.color,
      width: `${props.size}px`,
      height: `${props.size}px`
    })

    return {
      iconStyles
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon {
    position: relative;
    border-radius: 50%;
    background-color: red;

    img {
      position: absolute;
      width: 22px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
