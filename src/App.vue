<template>
  <header class="header">
    <div class="header__content">
      <img
        class="header__content__image"
        :src="require('@/assets/logo.png')" />

      <WalletModule class="wallet-module"/>
    </div>
  </header>

  <div class="container">
    <router-view />
  </div>
</template>

<script>
// import { ref } from 'vue'

import WalletModule from '@/components/_core/WalletModule'

export default {
  components: {
    WalletModule
  },

  setup () {
    return {
      //
    }
  }
}
</script>

<style lang="css">
* {
  moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  color: #FFFFFF;
  background-color: #141416;
  margin: 0;
  padding: 0;
}
</style>

<style lang="scss">
$app-padding: 10rem;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .header {
    height: 80px;
    beackground: {
      color: #141416;
    }
    border: {
      bottom: 1px solid #363944;
    }

    .header__content {
      display: flex;
      padding: 1.25rem 10rem 0;

      .wallet-module {
        margin: {
          left: auto;
        }
      }
    }
  }

  .container {
    max-width: 1700px;
    margin: 0 auto;
    padding: 0 $app-padding + 1rem;
  }
}
</style>
