import { App } from 'vue'
import Notifications from './Notifications.vue'
import { NotificationsPluginOptions } from './types'
import { notify } from './notify'

export function install(app: App, args: NotificationsPluginOptions = {}): void {
  Object.entries(args).forEach((entry) => new Map().set(...entry))
  const name = args.name || 'notify'

  app.config.globalProperties['$' + name] = notify
  // if flag exist then register component globally
  if (args.setGlobal) {
    app.component(args.componentName || 'vNotifications', Notifications)
  }
}
