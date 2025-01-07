import { Keymap } from 'comuse-shared'

export function useKeyMap(element: HTMLElement) {
  return new Keymap(element)
}
