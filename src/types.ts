import mitt from 'mitt'

export interface NotificationsOptions {
  id?: number
  title?: string // can be html elements
  color?: string
  timeout?: number
  clean?: boolean
  clear?: boolean
  ignoreDuplicates?: boolean
  showCloseButton?: boolean
  reverseDirection?: boolean
}

type EventType = {
  add: NotificationsOptions
  close: unknown
}

export const emitter = mitt<EventType>()

export interface NotificationsPluginOptions {
  name?: string // ability to set name for options approach
  componentName?: string // component name you can customise global name
}

export type NotificationItem = Pick<NotificationsOptions, 'id' | 'title' | 'color' | 'timeout' | 'showCloseButton' | 'reverseDirection'>
export type NotificationItemByType = Pick<NotificationsOptions, 'id' | 'timeout' | 'showCloseButton' | 'reverseDirection'>

export const NotificationSTATE = { IDLE: 0, DESTROYED: 2 } as const

export type NotificationItemState = typeof NotificationSTATE

export type NotificationItemWithTimer = NotificationItem & {
  timer?: NodeJS.Timeout
}

export type NotificationItemExtended = NotificationItemWithTimer & {
  state: NotificationItemState[keyof NotificationItemState]
  width: number
}

export interface Data {
  list: NotificationItemExtended[]
}
