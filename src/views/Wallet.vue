<template>
  <div class="wallet-view">
     <div class="wallet__header">
      <div
        class="back-button"
        @click="routeBack()">
        <img class="back-arrow" :src="require('@/assets/back-arrow.png')" />
      </div>
      <h1>Profile</h1>
    </div>

    <div class="divider" />

    <div class="wallet__content">
      <AccountTile
        v-for="(account, index) in contracts"
        :key="`account-tile--${index}`"
        :name="account.name"
        :address="account.address"
        :balance="account.balance"
        :tokens="account.tokens"
        type="ETH"/>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

import AccountTile from '@/components/Wallet/Wallet_AccountTile'

export default {
  name: '',

  components: {
    AccountTile
  },

  setup () {
    const store = useStore()
    /* Static */

    /*
     * This data would be typically be dynamic. Also, I would have a helper function
     * to concatenate the address with an eplisis in between.
     *
     *  Also, all this data would come from the store
    */
    const accounts = [
      {
        name: 'Anonymous',
        address: '0xc7f76...790C',
        tokens: '100,000',
        balance: store.state.wallet.balance
      }
    ]

    onMounted(() => {
      // console.log(store.state.network.contract)
    })

    const contracts = computed(() => {
      return accounts
    })

    /* Methods */
    const routeBack = () => {
      router.back()
    }

    return {
      contracts,
      routeBack
    }
  }
}
</script>

<style lang="scss" scoped>
  .wallet-view {
    .wallet__header {
      display: flex;
      padding: 4rem 0;

      & > * {
        padding: 0;
        margin: 0;
      }

      .back-button {
        cursor: pointer;

        .back-arrow {
          pointer-events: none;
          margin: 1.2rem 1rem 0 0;
          height: 30px;
          width: 30px;
        }
      }

      h1 {
        font-size: 3rem;
      }
    }

    .divider {
      height: 1px;
      width: 100%;
      background: {
        color: #363944;
      }
    }

    .wallet__content {
      padding: 4rem 0 0;
      width: 100%;
      display: grid;
      grid-gap: 0 2.5rem;
      grid-template:
        'a b' auto /
        1fr 1fr;

      .connection-types {
        grid-area: a;

        & > * {
          margin: 0 0 2rem;
        }
      }
    }
  }
</style>
