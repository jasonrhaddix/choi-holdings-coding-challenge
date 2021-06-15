<template>
  <div
    class="wallet-module">
    <div
      v-if="isConnected"
      @click="goToWallet"
      class="wallet-module__balance">
      <div class="balance__content">
        <img :src="require('@/assets/wallet-avatar.png')" />
        <span>{{ walletBalance }}</span>
        <span>ETH</span>
      </div>
    </div>
    <div
      v-else
      class="wallet-module__action">Connect Wallet</div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import router from '@/router'

export default {
  name: 'wallet-module',

  setup () {
    const store = useStore()

    /* Computed */
    const isConnected = computed(() => store.getters.isConnected)
    const walletBalance = computed(() => {
      return parseFloat(store.state.wallet.balance).toFixed(3)
    })

    const goToWallet = () => {
      router.push({ name: 'wallet' })
    }

    return {
      isConnected,
      walletBalance,
      goToWallet
    }
  }
}
</script>

<style lang="scss" scoped>
  .wallet-module {
    width: 145px;
    height: 40px;
    border: 2px solid #777e91;
    border-radius: 50px;
    display: block;

    .wallet-module__balance {
      cursor: pointer;
      height: 100%;

      .balance__content {
        position: relative;
        height: 100%;
        display: flex;

        img {
          height: 100%;
          transform: scale(0.9);
        }

        span {
          font-weight: 600;
          margin: {
            left: 0.5rem;
            top: 0.5rem;
          }
        }
      }
    }

    .wallet-module__action {

    }
  }
</style>
