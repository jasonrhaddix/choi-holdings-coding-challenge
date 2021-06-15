<template>
  <div class="home-view">
    <div class="home__header">
      <div
        v-if="selectedWallet"
        class="back-button"
        @click="setService(null)">
        <img class="back-arrow" :src="require('@/assets/back-arrow.png')" />
      </div>
      <h1>Connect your wallet</h1>
    </div>

    <div class="divider" />

    <div class="home__content">
      <div class="connection-types">
        <ConnectionSelector
          v-for="selector in selectorList"
          :key="`selector-${selector.title}`"
          :title="selector.title"
          :icon="selector.icon"
          @click="setService(selector.service)"/>
      </div>
      <div class="connection-terms">
        <div
          v-if="selectedWallet"
          class="connection-terms__content">
          <h2>Terms of Serivce</h2>
          <p>Please take a few minutes to read and understand <b>Stacks Terms of Service.</b> To continue, you'll need to accept the terms of services by checking the boxes.</p>
          <img :src="require('@/assets/terms-img.jpg')" />
          <div class="checkbox-group">
            <label class="checkbox">
              <span class="checkbox__input">
                <input type="checkbox" name="checkbox" value="age" v-model="termsAgreement.age">
                <span class="checkbox__control">
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                    <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
                  </svg>
                </span>
              </span>
              <span class="radio__label">I am at least 13 years or older</span>
            </label>

            <label class="checkbox">
              <span class="checkbox__input">
                <input type="checkbox" name="checkbox" value="terms" v-model="termsAgreement.terms">
                <span class="checkbox__control">
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                    <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
                  </svg>
                </span>
              </span>
              <span class="radio__label">I agree to Stacks Terms of Service</span>
            </label>
          </div>
          <div class="actions">
            <AppButton
              label="Cancel"
              @click="setService(null)"/>
            <AppButton
              :disabled="!canConnect"
              label="Connect"
              @click="connectToWallet"/>
          </div>
        </div>
        <div
          v-else
          class="misc-image">
          <img :src="require('@/assets/home-img-1.jpg')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ethers } from 'ethers/lib.esm'

import router from '@/router'

import { getProvider, connectWallet, tokenContract, getBalance } from '@/helpers/network_connector'

import ConnectionSelector from '@/components/Wallet/Wallet_ConnectionSelector.vue'
import AppButton from '@/components/_core/AppButton.vue'

export default {
  name: 'Home',

  components: {
    ConnectionSelector,
    AppButton
  },

  setup () {
    const store = useStore()

    /* Static */
    const selectorList = [
      {
        title: 'Metamask',
        service: 'metamask',
        icon: {
          type: 'wallet',
          color: '#3772ff'
        }
      },
      {
        title: 'MyEtherWallet',
        service: 'myetherwallet',
        icon: {
          type: 'wallet',
          color: '#45b36b'
        }
      },
      {
        title: 'Wallet Connect',
        service: 'walletconnect',
        icon: {
          type: 'wallet',
          color: '#ef466f'
        }
      }
    ]

    /* Reactive */
    const selectedWallet = ref(null)
    const termsAgreement = ref({
      age: false,
      terms: false
    })

    /* Computed */
    const canConnect = computed(() => {
      return termsAgreement.value.age && termsAgreement.value.terms
    })

    /* Methods */
    const setService = service => {
      selectedWallet.value = service
    }

    const connectToWallet = async () => {
      const provider = await getProvider()
      if (provider) await store.dispatch('updateNetworkConnection', { provider: provider })

      await connectWallet(provider.provider)

      const contract = await tokenContract(provider)
      if (contract) await store.dispatch('updateNetworkConnection', { contract: contract })

      const balance = await getBalance(contract)
      if (balance) await store.dispatch('updateWallet', { balance: ethers.utils.formatEther(balance) })

      if (provider && contract) router.push({ name: 'wallet' })
    }

    return {
      selectedWallet,
      termsAgreement,
      canConnect,
      selectorList,
      setService,
      connectToWallet
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-view {
    .home__header {
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

    .home__content {
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
          cursor: pointer;
          margin: 0 0 2rem;
        }
      }

      .connection-terms {
        .connection-terms__content {

          h2 {
            font-size: 2.5rem;
            margin: {
              top: 0;
              bottom: 1rem;
            }
          }

          p {
            color: #777e91;
            margin: {
              bottom: 0;
            }
            b {
              color: white;
            }
          }

          img {
            margin: 2rem 0;
            width: 100%;
            border-radius: 15px;
          }

          .checkbox-group {

            .checkbox {
              display: grid;
              grid-template-columns: min-content auto;
              grid-gap: 0.5em;
              font-size: 1.5rem;
              color: var(--color);
              margin: {
                bottom: 1rem;
              }

              &--disabled {
                color: var(--disabled);
              }
            }

            .checkbox__control {
              display: inline-grid;
              width: 1em;
              height: 1em;
              border-radius: 0.25em;
              border: 0.1em solid #363944;

              svg {
                // transition: transform 0.1s ease-in 25ms;
                transform: scale(0);
                transform-origin: bottom left;
              }
            }

            .checkbox__input {
              display: grid;
              grid-template-areas: "checkbox";

              > * {
                grid-area: checkbox;
              }

              input {
                opacity: 0;
                width: 1em;
                height: 1em;

                &:checked + .checkbox__control svg {
                  transform: scale(1);
                }

                &:disabled + .checkbox__control {
                  color: var(--disabled);
                }
              }
            }

            .radio__label {
              font-size: 1.1rem !important;
            }
          }

          .actions {
            display: flex;
          }
        }

        .misc-image {
          grid-area: b;

          border-radius: 30px;
          overflow: hidden;

          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
