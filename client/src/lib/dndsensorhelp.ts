import type { MouseEvent, KeyboardEvent } from 'react'
import {
  MouseSensor as LibMouseSensor,
  KeyboardSensor as LibKeyboardSensor
} from '@dnd-kit/core'

export class MouseSensor extends LibMouseSensor {
  static activators = [
    {
      eventName: 'onMouseDown' as const,
      handler: ({ nativeEvent: event }: MouseEvent) => {
        return shouldHandleEvent(event.target as HTMLElement)
      }
    }
  ]
}

function shouldHandleEvent(element: HTMLElement | null) {
  let cur = element

    while (cur) {
        console.log(cur + "hahha" + cur.dataset)
    if (cur.dataset && cur.dataset.noDnd) {
        return false
    }
    cur = cur.parentElement
  }

  return true
}