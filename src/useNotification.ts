import { NotificationsOptions, emitter, NotificationItemByType } from './types'

/**
 * Usage
 * ex1:
 * import { useNotification } from '@/modules/notifications/useNotification'
 * const notification = useNotification()
 * useNotification({
 *     title: 'text',
 *     color: 'error',
 *   })
 * ex2:
 * import { useNotification } from '@/modules/notifications/useNotification'
 * notification.success('message')
 * ex3:
 * import { useNotification } from '@/modules/notifications/useNotification'
 * useNotification('message')
 *
 * @param args?
 */
export const useNotification = (args?: NotificationsOptions | string) => {
  if (typeof args === 'string') {
    args = { title: args }
  }

  if (typeof args === 'object') {
    emitter.emit('add', args)
  }

  return {
    success: (msg: string, opt?: NotificationItemByType) => {
      emitter.emit('add', { ...opt, ...{ color: 'success', title: msg } })
    },
    info(msg: string, opt?: NotificationItemByType) {
      emitter.emit('add', { ...opt, ...{ color: 'info', title: msg } })
    },
    error(msg: string, opt?: NotificationItemByType) {
      emitter.emit('add', { ...opt, ...{ color: 'error', title: msg } })
    },
  }
}

useNotification.close = (id: unknown): void => {
  emitter.emit('close', id)
}
