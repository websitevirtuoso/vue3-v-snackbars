<template>
  <div id="app">
    <v-app>
      <h2>
        Vuetify 3 Snackbars
        <br />
        <a href="https://github.com/websitevirtuoso/vue3-v-snackbars/blob/master/README.md" target="readme">Readme</a>
        <a href="https://github.com/websitevirtuoso/vue3-v-snackbars/" target="issues" class="ml-5">Github</a>
      </h2>
      <div class="content">
        <div class="block">
          <button class="success" @click="show('success')">
            <i class="icon ion-information-circled" />
            SUCCESS
          </button>
          <button class="warn" @click="show('info')">
            <i class="icon ion-alert-circled" />
            WARNING
          </button>
          <button class="error" @click="show('error')">
            <i class="icon ion-close-circled" />
            ERROR
          </button>
        </div>
      </div>

      <div class="content mt-5">
        <div class="block">
          <button class="success mr-5" @click="anotherWayToUsePlugin">
            <i class="icon ion-information-circled" />
            Another way to call plugin
          </button>
          <button class="error mr-5" @click="anotherWayToUsePluginError">
            <i class="icon ion-close-circled" />
            error notification with custom params
          </button>
          <button class="error" @click="moreCustomOptions">
            <i class="icon ion-close-circled" />
            more custom options
          </button>
        </div>
      </div>

      <!-- todo maybe in future make location configurable when execute plugin -->
      <v-notifications location="bottom center" :timeout="5000" />
    </v-app>
  </div>
</template>

<script lang="ts" setup>
// import component to use somewhere/ you also can register component globally to avoid register component everytime
import VNotifications from '../../src/Notifications.vue'
// using composable to use in this component
import { useNotification } from '../../src/useNotification'

const show = (type = '') => {
  const title = `
        This is notification text!
        <br>
        Date: ${new Date()}
      `

  useNotification({
    title,
    color: type,
  })
}
const anotherWayToUsePlugin = () => {
  const notification = useNotification()
  const title = `
        Another way to use plugin!
        <br>
        Date: ${new Date()}
      `
  notification.success(title)
}

const anotherWayToUsePluginError = () => {
  const notification = useNotification()
  const title = `
        Another way to use plugin!
        <br>
        Date: ${new Date()}
      `
  notification.error(title, { showCloseButton: false, timeout: 10000 })
}

const moreCustomOptions = () => {
  const notification = useNotification()
  const title = `
        Another way to use plugin!
        <br>
        Date: ${new Date()}
      `

  useNotification({
    title,
    color: 'error',
    showCloseButton: false,
    ignoreDuplicates: true,
    timeout: 1000,
    reverseDirection: false
  })
}
</script>

<style lang="scss">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  padding: 0;
  padding-top: 80px;
  margin: 0;

  h2 {
    font-weight: 300;

    a {
      color: black;
      font-size: 12px;
    }
  }

  button {
    display: inline-block;
    box-sizing: border-box;

    border: 0;
    border-radius: 3px;
    color: white;
    vertical-align: top;
    text-decoration: none;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;

    outline: none;

    transition: all 500ms;
    padding: 12px;
    box-shadow: none;
    background: #02ccba;
    font-weight: 600;
    width: 100%;

    letter-spacing: 1px;
    box-shadow: 0 5px 15px 0px rgba(46, 61, 73, 0.1);

    &.success {
      background: #68cd86;
    }

    &.warn {
      background: #ffb648;
    }

    &.error {
      background: #e54d42;
    }

    &:active {
      opacity: 0.8;
    }
  }

  #app {
    text-align: center;
    color: #2c3e50;

    .content {
      margin: 0 auto;
      max-width: 420px;
    }
  }
}

.sub-button {
  display: inline-block;
  float: right;
  background: #e54d42;
  padding: 4px;
  box-shadow: 0 5px 15px 0px rgba(46, 61, 73, 0.1);
}

/*
  EXAMPLES
*/

.notification.n-light {
  margin: 10px;
  margin-bottom: 0;

  border-radius: 3px;
  font-size: 13px;

  padding: 10px 20px;

  color: #495061;
  background: #eaf4fe;

  border: 1px solid #d4e8fd;

  .notification-title {
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 10px;
    color: #2589f3;
  }
}

.block {
  display: flex;
}
</style>
