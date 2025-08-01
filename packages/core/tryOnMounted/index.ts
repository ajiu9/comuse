import type { Fn } from '../types'

import { nextTick, onMounted } from 'vue'
import { getLifeCycleTarget } from '../utils'

/**
 * Call onMounted() if it's inside a component lifecycle, if not, just call the function
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 * @param target
 */
export function tryOnMounted(fn: Fn, sync = true, target?: any) {
  const instance = getLifeCycleTarget(target)
  if (instance)
    onMounted(fn, target)
  else if (sync)
    fn()
  else
    nextTick(fn)
}
