import type { NotificationItemWithTimer } from './types'
interface Direction {
  x: string
  y: string
}

const directions = {
  x: ['left', 'center', 'right'],
  y: ['top', 'bottom'],
}

/**
 * Sequential ID generator
 */
export const Id = (
  (i) => () =>
    i++
)(0)

/**
 * Splits space/tab separated string into array and cleans empty string items.
 */
export const split = (value: string): string[] => {
  return value.split(/\s+/gi).filter((v) => v)
}

/**
 * Cleanes and transforms string of format "x y" into object {x, y}.
 * Possible combinations:
 *   x - left, center, right
 *   y - top, bottom
 */
export const listToDirection = (value: string): Direction => {
  const values = split(value)

  let x = ''
  let y = ''

  values.forEach((v) => {
    if (directions.y.indexOf(v) !== -1) {
      y = v
    }
    if (directions.x.indexOf(v) !== -1) {
      x = v
    }
  })

  return { x, y }
}

export class Timer {
  private start!: number
  private readonly remaining: number
  private notifyItem: NotificationItemWithTimer
  private readonly callback: () => void

  constructor(callback: () => void, delay: number, notifyItem: NotificationItemWithTimer) {
    this.remaining = delay
    this.callback = callback
    this.notifyItem = notifyItem
    this.resume()
  }

  resume(): void {
    this.start = Date.now()
    clearTimeout(this.notifyItem.timer)
    this.notifyItem.timer = setTimeout(this.callback, this.remaining)
  }
}
