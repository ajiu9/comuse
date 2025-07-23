import { describe, expect, it, vi } from 'vitest'
import parseUrlParam from './index'

describe('parseUrlParam', () => {
  it('should parse string values without convert', () => {
    const url = '?a=1&b=true&c=null&d=undefined&e=NaN&f=10.5&g=Infinity&h=test'
    expect(parseUrlParam(url)).toEqual({
      a: '1',
      b: 'true',
      c: 'null',
      d: 'undefined',
      e: 'NaN',
      f: '10.5',
      g: 'Infinity',
      h: 'test',
    })
  })

  it('should convert values when convert=true', () => {
    const url = '?a=1&b=true&c=null&d=undefined&e=NaN&f=10.5&g=Infinity&h=test&i=-Infinity'
    const result = parseUrlParam(url, true)
    expect(result.a).toBe(1)
    expect(result.b).toBe(true)
    expect(result.c).toBeNull()
    expect(result.d).toBe(undefined)
    expect(Number.isNaN(result.e as number)).toBe(true)
    expect(result.f).toBe(10.5)
    expect(result.g).toBe(Infinity)
    expect(result.h).toBe('test')
    expect(result.i).toBe(-Infinity)
  })

  it('should handle empty url', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {})
    expect(parseUrlParam('')).toEqual({})
    expect(spy).toHaveBeenCalledWith('url is required')
    spy.mockRestore()
  })

  it('should handle url without ?', () => {
    expect(parseUrlParam('a=1&b=2')).toEqual({ a: '1', b: '2' })
    expect(parseUrlParam('a=1&b=2', true)).toEqual({ a: 1, b: 2 })
  })

  it('should handle url with prefix', () => {
    expect(parseUrlParam('http://test.com?a=1&b=2')).toEqual({ a: '1', b: '2' })
    expect(parseUrlParam('http://test.com?a=1&b=2', true)).toEqual({ a: 1, b: 2 })
  })

  it('should decodeURIComponent for key and value', () => {
    expect(parseUrlParam('?a%20b=hello%20world')).toEqual({ 'a b': 'hello world' })
    expect(parseUrlParam('?a%20b=hello%20world', true)).toEqual({ 'a b': 'hello world' })
  })

  it('should handle numbers and not convert scientific, hex, bin, oct', () => {
    const url = '?a=123&b=0.5&c=0xFF&d=1e3&e=0b11&f=0o77'
    const result = parseUrlParam(url, true)
    expect(result.a).toBe(123)
    expect(result.b).toBe(0.5)
    expect(result.c).toBe('0xFF')
    expect(result.d).toBe('1e3')
    expect(result.e).toBe('0b11')
    expect(result.f).toBe('0o77')
  })

  it('should handle empty value', () => {
    expect(parseUrlParam('?a=&b=')).toEqual({ a: '', b: '' })
    expect(parseUrlParam('?a=&b=', true)).toEqual({ a: '', b: '' })
  })

  it('should handle no params', () => {
    expect(parseUrlParam('?')).toEqual({})
    expect(parseUrlParam('?', true)).toEqual({})
  })

  it('should handle repeated keys (last wins)', () => {
    expect(parseUrlParam('?a=1&a=2')).toEqual({ a: '2' })
    expect(parseUrlParam('?a=1&a=2', true)).toEqual({ a: 2 })
  })

  it('should handle special characters', () => {
    expect(parseUrlParam('?a=%E4%B8%AD%E6%96%87')).toEqual({ a: '中文' })
    expect(parseUrlParam('?a=%E4%B8%AD%E6%96%87', true)).toEqual({ a: '中文' })
  })
})
