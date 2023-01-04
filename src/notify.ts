import { NotificationsOptions, emitter } from './types'

export const notify = (args: NotificationsOptions | string): void => {
  if (typeof args === 'string') {
    args = { title: args }
  }

  if (typeof args === 'object') {
    emitter.emit('add', args)
  }
}

notify.close = (id: unknown): void => {
  emitter.emit('close', id)
}
