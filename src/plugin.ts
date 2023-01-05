import { App } from 'vue'
import Notifications from './Notifications.vue'
import { NotificationsPluginOptions } from './types'
import { useNotification } from './useNotification'

export function install(app: App, args: NotificationsPluginOptions = {}): void {
  Object.entries(args).forEach((entry) => new Map().set(...entry))
  const name = args.name || 'notify'

  app.config.globalProperties['$' + name] = useNotification
  app.component(args.componentName || 'vNotifications', Notifications)
}
