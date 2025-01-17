import { describe, expect, it } from 'vitest'
import { formatTime, parseTime } from './index'

describe('parseTime', () => {
  it('should return null when no arguments are provided', () => {
    expect(parseTime()).toBeNull()
  })

  it('should correctly parse a timestamp in milliseconds', () => {
    const timestamp = Date.now()
    expect(parseTime(timestamp, 'yyyy-MM-dd')).toBe(new Date(timestamp).toISOString().split('T')[0])
  })

  it('should correctly parse a timestamp in seconds', () => {
    const timestamp = Math.floor(Date.now() / 1000)
    expect(parseTime(timestamp, 'yyyy-MM-dd')).toBe(new Date(timestamp * 1000).toISOString().split('T')[0])
  })

  it('should correctly parse a date object', () => {
    const date = new Date()
    expect(parseTime(date, 'yyyy-MM-dd')).toBe(date.toISOString().split('T')[0])
  })

  it('should return null for invalid date', () => {
    expect(parseTime('invalid-date', 'yyyy-MM-dd')).toBeNull()
  })

  it('should format date according to the provided format', () => {
    const date = new Date(2023, 9, 5, 14, 30, 45) // October 5, 2023, 14:30:45
    expect(parseTime(date, 'yyyy-MM-dd hh:mm:ss')).toBe('2023-10-05 14:30:45')
  })
})

describe('formatTime', () => {
  it('should format a recent timestamp to "刚刚"', () => {
    const timestamp = Date.now()
    expect(formatTime(timestamp)).toBe('刚刚')
  })

  it('should format a timestamp within the last minute', () => {
    const timestamp = Date.now() - 30 * 1000 // 30 seconds ago
    expect(formatTime(timestamp)).toBe('1分钟前')
  })

  it('should format a timestamp within the last hour', () => {
    const timestamp = Date.now() - 3600 * 1000 // 1 hour ago
    expect(formatTime(timestamp)).toBe('1小时前')
  })

  it('should format a timestamp within the last day', () => {
    const timestamp = Date.now() - 2 * 3600 * 1000 // 2 hours ago
    expect(formatTime(timestamp)).toBe('2小时前')
  })

  it('should format a timestamp more than a day ago', () => {
    const timestamp = new Date(2023, 8, 1, 12, 0, 0).getTime() // September 1, 2023, 12:00:00
    expect(formatTime(timestamp)).toBe('2023-09-01')
  })

  it('should format a timestamp more than a year ago', () => {
    const timestamp = new Date(2022, 8, 1, 12, 0, 0).getTime() // September 1, 2022, 12:00:00
    expect(formatTime(timestamp, 'yyyy-MM-dd')).toBe('2022-09-01')
  })

  it('should format a timestamp using the provided format', () => {
    const timestamp = new Date(2023, 8, 1, 12, 0, 0).getTime() // September 1, 2023, 12:00:00
    expect(formatTime(timestamp, 'yyyy-MM-dd')).toBe('2023-09-01')
  })
})
