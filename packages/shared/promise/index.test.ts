import { expect, it } from 'vitest'
import { createSingletonPromise } from '.'
import { waiting } from '../utils'

it('promise', async () => {
  let dummy = 0

  const promise = createSingletonPromise(async () => {
    await waiting(10)
    dummy += 1
    return dummy
  })

  expect(dummy).toBe(0)

  await promise()

  expect(dummy).toBe(1)

  await promise()
  expect(await promise()).toBe(1)

  expect(dummy).toBe(1)

  await promise.reset()

  await promise()

  expect(dummy).toBe(2)
})
