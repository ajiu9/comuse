import { describe, expect, it } from 'vitest'
import { clone, cloneJSON } from './index'

declare global {
  interface Object {
    __proto__: any
  }
}

describe('cloneJSON', () => {
  it('should clone all JavaScript types correctly', () => {
    const input = {
      // Primitive Types
      nullValue: null,
      undefinedValue: undefined,
      booleanValue: true,
      numberValue: 42,
      stringValue: 'Hello, World!',
      symbolValue: Symbol('test'),
      bigintValue: BigInt(123456789012345678901234567890n),

      // Object Types
      objectValue: {
        key1: 'value1',
        key2: 123,
        key3: true,
        nestedObject: {
          nestedKey: 'nestedValue',
        },
      },
      arrayValue: [1, 2, 3, { a: 4 }],
      dateValue: new Date(),
      regExpValue: /test/g,
      mapValue: new Map([['key1', 'value1'], ['key2', 'value2']]),
      setValue: new Set([1, 2, 3, 4]),
      functionValue() { return 'function result' },
      errorValue: new Error('Test Error'),
      promiseValue: Promise.resolve('resolved value'),
      protoValue: {},
    }

    Object.defineProperty(input.protoValue, '__proto__', {
      value: { a: 1, b: 2 },
      configurable: true,
      enumerable: true,
      writable: true,
    })

    const output = cloneJSON(input)
    expect(output).toEqual(input)
    expect(output).not.toBe(input)

    expect(output.nullValue).toBe(null)
    expect(output.undefinedValue).toBe(undefined)
    expect(output.booleanValue).toBe(true)
    expect(output.numberValue).toBe(42)
    expect(output.stringValue).toBe('Hello, World!')
    expect(output.symbolValue).toBe(input.symbolValue)
    expect(output.bigintValue).toBe(input.bigintValue)

    expect(output.bigintValue).toBe(input.bigintValue)
    output.objectValue.key1 = 'changed'
    expect(input.objectValue.key1).toBe('value1')

    output.arrayValue[0] = 10
    expect(input.arrayValue[0]).toEqual(1)

    expect(output.dateValue).toEqual(input.dateValue)
    expect(output.regExpValue).toEqual(input.regExpValue)
    expect(output.mapValue).toEqual(input.mapValue)
    expect(output.setValue).toEqual(input.setValue)
    expect(output.functionValue()).toBe('function result')
    expect(output.errorValue).toEqual(input.errorValue)
    expect(output.promiseValue).toEqual(input.promiseValue)

    expect(output.protoValue).toEqual(input.protoValue)
    expect(output.protoValue.__proto__).toStrictEqual(input.protoValue.__proto__)
  })
})

describe('clone', () => {
  const input = {
    // Primitive Types
    nullValue: null,
    undefinedValue: undefined,
    booleanValue: true,
    numberValue: 42,
    stringValue: 'Hello, World!',
    symbolValue: Symbol('test'),
    bigintValue: BigInt(123456789012345678901234567890n),

    // Object Types
    objectValue: {
      key1: 'value1',
      key2: 123,
      key3: true,
      nestedObject: {
        nestedKey: 'nestedValue',
      },
    },
    arrayValue: [1, 2, 3, { a: 4 }],
    dateValue: new Date(),
    regExpValue: /test/g,
    mapValue: new Map([['key1', 'value1'], ['key2', 'value2']]),
    setValue: new Set([1, 2, 3, 4]),
    functionValue() { return 'function result' },
    errorValue: new Error('Test Error'),
    promiseValue: Promise.resolve('resolved value'),
    protoValue: {},
  }

  it('should clone null correctly', () => {
    expect(clone(input.nullValue)).toBe(null)
  })

  it('should clone undefined correctly', () => {
    expect(clone(input.undefinedValue)).toBe(undefined)
  })

  it('should clone boolean correctly', () => {
    expect(clone(input.booleanValue)).toBe(true)
  })

  it('should clone number correctly', () => {
    expect(clone(input.numberValue)).toBe(42)
  })

  it('should clone string correctly', () => {
    expect(clone(input.stringValue)).toBe('Hello, World!')
  })

  it('should clone symbol correctly', () => {
    expect(clone(input.symbolValue)).toBe(input.symbolValue)
  })

  it('should clone bigint correctly', () => {
    expect(clone(input.bigintValue)).toBe(input.bigintValue)
  })

  it('should clone object correctly', () => {
    const clonedObject = clone(input.objectValue)
    expect(clonedObject).toEqual(input.objectValue)
    expect(clonedObject).not.toBe(input.objectValue)
  })

  it('should clone array correctly', () => {
    const clonedArray = clone(input.arrayValue)
    expect(clonedArray).toEqual(input.arrayValue)
    expect(clonedArray).not.toBe(input.arrayValue)
  })

  it('should clone date correctly', () => {
    const clonedDate = clone(input.dateValue)
    expect(clonedDate).toEqual(input.dateValue)
    expect(clonedDate).not.toBe(input.dateValue)
  })

  it('should clone regex correctly', () => {
    const clonedRegExp = clone(input.regExpValue)
    expect(clonedRegExp).toEqual(input.regExpValue)
    expect(clonedRegExp).not.toBe(input.regExpValue)
  })

  it('should clone map correctly', () => {
    const clonedMap = clone(input.mapValue)
    expect(clonedMap).toEqual(input.mapValue)
    expect(clonedMap).not.toBe(input.mapValue)
  })

  it('should clone set correctly', () => {
    const clonedSet = clone(input.setValue)
    expect(clonedSet).toEqual(input.setValue)
    expect(clonedSet).not.toBe(input.setValue)
  })

  it('should not clone function correctly', () => {
    const clonedFunction = clone(input.functionValue)
    expect(clonedFunction).toBe(input.functionValue)
  })

  it('should not clone error correctly', () => {
    const clonedError = clone(input.errorValue)
    expect(clonedError).toBe(input.errorValue)
  })

  it('should not clone promise correctly', () => {
    const clonedPromise = clone(input.promiseValue)
    expect(clonedPromise).toBe(input.promiseValue)
  })

  it('should clone object with prototype correctly', () => {
    const clonedProto = clone(input.protoValue)
    expect(clonedProto).toEqual(input.protoValue)
    expect(clonedProto).not.toBe(input.protoValue)
  })
  it('should clone object with the same constructor', () => {
    class CustomClass {
      constructor(public value: string) {}
    }

    const originalObject = new CustomClass('test')
    const clonedObject = clone(originalObject)

    expect(clonedObject).toEqual(originalObject)
    expect(clonedObject).not.toBe(originalObject)
    expect(clonedObject.constructor).toBe(originalObject.constructor)
  })

  it('should clone date with the same constructor', () => {
    const originalDate = new Date()
    const clonedDate = clone(originalDate)

    expect(clonedDate).toEqual(originalDate)
    expect(clonedDate).not.toBe(originalDate)
    expect(clonedDate.constructor).toBe(originalDate.constructor)
  })

  it('should clone regex with the same constructor', () => {
    const originalRegExp = /test/g
    const clonedRegExp = clone(originalRegExp)

    expect(clonedRegExp).toEqual(originalRegExp)
    expect(clonedRegExp).not.toBe(originalRegExp)
    expect(clonedRegExp.constructor).toBe(originalRegExp.constructor)
  })

  it('should handle deep nested objects correctly', () => {
    const deepNestedObject = {
      a: {
        b: {
          c: 'deep value',
        },
      },
    }
    const clonedDeepNestedObject = clone(deepNestedObject)
    expect(clonedDeepNestedObject).toEqual(deepNestedObject)
    expect(clonedDeepNestedObject).not.toBe(deepNestedObject)
    expect(clonedDeepNestedObject.a).not.toBe(deepNestedObject.a)
    expect(clonedDeepNestedObject.a.b).not.toBe(deepNestedObject.a.b)
  })

  it('should handle empty objects correctly', () => {
    const emptyObject = {}
    const clonedEmptyObject = clone(emptyObject)
    expect(clonedEmptyObject).toEqual(emptyObject)
    expect(clonedEmptyObject).not.toBe(emptyObject)
  })

  it('should handle objects with methods correctly', () => {
    const objectWithMethod = {
      method() {
        return 'hello'
      },
    }
    const clonedObjectWithMethod = clone(objectWithMethod)
    expect(clonedObjectWithMethod).toEqual(objectWithMethod)
    expect(clonedObjectWithMethod).not.toBe(objectWithMethod)
    expect((clonedObjectWithMethod as any).method).toBe((objectWithMethod as any).method)
  })

  it('should handle large arrays correctly', () => {
    const largeArray = new Array(1000).fill(0).map((_, index) => index)
    const clonedLargeArray = clone(largeArray)
    expect(clonedLargeArray).toEqual(largeArray)
    expect(clonedLargeArray).not.toBe(largeArray)
  })

  it('should handle large objects correctly', () => {
    const largeObject: any = {}
    for (let i = 0; i < 1000; i++)
      largeObject[`key${i}`] = i

    const clonedLargeObject = clone(largeObject)
    expect(clonedLargeObject).toEqual(largeObject)
    expect(clonedLargeObject).not.toBe(largeObject)
  })

  it('should handle objects with null prototype correctly', () => {
    const objectWithNullProto = Object.create(null)
    objectWithNullProto.key = 'value'
    const clonedObjectWithNullProto = clone(objectWithNullProto)
    expect(clonedObjectWithNullProto).toEqual(objectWithNullProto)
    expect(clonedObjectWithNullProto).not.toBe(objectWithNullProto)
  })
})
