<template>
  <div class="wallet__account-tile">
    <div class="wallet__account-tile__header">
      <h3>{{ name }}</h3>
      <small>{{ address }}</small>
    </div>

    <div class="wallet__account-tile__body">
      <div class="token-img">
        <img :src="require('@/assets/token-icon.png')">
      </div>
      <div class="account-details">
        <small>balance</small>
        <p>{{ walletBalance }} {{ type }}</p>
        <small>tokens</small>
        <p>{{ tokens }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: '',

  props: {
    name: {
      type: String,
      required: false,
      default: 'Anonymous'
    },

    address: {
      type: String,
      required: false,
      default: '--'
    },

    balance: {
      type: String,
      required: false,
      default: '--'
    },

    tokens: {
      type: String,
      required: false,
      default: '--'
    },

    type: {
      type: String,
      required: false,
      default: '--'
    }
  },

  setup (props) {
    const walletBalance = computed(() => {
      return parseFloat(props.balance).toFixed(3)
    })

    return {
      walletBalance
    }
  }
}
</script>

<style lang="scss">
  .wallet__account-tile {
    height: 200px;
    width: 250px;

    h3, h4, p {
      padding: 0;
      margin: 0;
    }

    & > * {
      padding: 0.4rem;
    }

    .wallet__account-tile__header {
      small {
        color: #777e91;
      }
    }

    .wallet__account-tile__body {
      display: flex;
      border-radius: 15px;
      background: {
        color: #23262f
      }

      & > * {
        padding: 0.35rem;
      }

      .token-img {
        width: 58px;

        img {
          width: 100%;
        }
      }

      .account-details {
        flex: 1;

        p {
          font-size: 1.2rem;
          font-weight: 600;
        }
      }
    }
  }
</style>
