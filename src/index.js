import Vuedl from 'vuedl'
import DialogLayout from './components/DialogLayout.vue'
import Confirm from './components/Confirm.vue'
import Toast from './components/Toast.vue'
import Alert from './components/Alert.vue'
import SnackbarLayout from './components/SnackbarLayout.vue'
import Prompt from './components/Prompt.vue'
import DialogActions from './components/DialogActions.vue'
import DialogCard from './components/DialogCard.vue'
import NotificationLayout from 'vuedl/src/components/NotificationLayout.vue'

const Plugin = {
  install (Vue, options = {}) {
    const property = options.property || '$dialog'
    Vue.use(Vuedl, options)
    const manager = Vue.prototype[property]
    manager.layout('default', DialogLayout)
    manager.layout('snackbar', SnackbarLayout)
    manager.layout('notification', NotificationLayout)
    Vue.component('DialogActions', DialogActions)
    Vue.component('DialogCard', DialogCard)
    manager.component('confirm', Confirm, {
      waitForResult: true,
      actions: {
        false: 'Cancel',
        true: 'OK'
      }
    })

    manager.component('warning', Confirm, {
      type: 'warning',
      waitForResult: true,
      actions: {
        false: 'Cancel',
        true: 'OK'
      }
    })

    manager.component('error', Confirm, {
      type: 'error',
      waitForResult: true,
      actions: ['Close']
    })

    manager.component('toast', Toast, {
      waitForResult: true
    })

    manager.message = {
      info: (message, options) => manager.toast({ text: message, type: 'info', ...options }),
      error: (message, options) => manager.toast({ text: message, type: 'error', ...options }),
      success: (message, options) => manager.toast({ text: message, type: 'success', ...options }),
      warning: (message, options) => manager.toast({ text: message, type: 'warning', ...options })
    }

    manager.component('alert', Alert, {
      waitForResult: true
    })

    manager.notify = {
      info: (message, options) => manager.alert({ text: message, type: 'info', ...options }),
      error: (message, options) => manager.alert({ text: message, type: 'error', ...options }),
      success: (message, options) => manager.alert({ text: message, type: 'success', ...options }),
      warning: (message, options) => manager.alert({ text: message, type: 'warning', ...options })
    }

    manager.component('prompt', Prompt, {
      waitForResult: true,
      actions: {
        false: 'Cancel',
        true: 'OK'
      }
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}

export default Plugin
