// parseGitUrl.test.ts
import { describe, expect, it } from 'vitest'
import { parseGitUrl } from './index'

describe('parseGitUrl', () => {
  it('should return empty string for invalid input', () => {
    expect(parseGitUrl('')).toBe('')
    expect(parseGitUrl(null as any)).toBe('')
    expect(parseGitUrl(undefined as any)).toBe('')
    expect(parseGitUrl(123 as any)).toBe('')
    expect(parseGitUrl({} as any)).toBe('')
  })

  it('should handle URLs with username', () => {
    expect(parseGitUrl('git@github.com:ajiu9/comuse.git')).toBe('https://github.com/ajiu9/comuse')
    expect(parseGitUrl('https://ajiu9@github.com/ajiu9/comuse.git')).toBe('https://github.com/ajiu9/comuse')
  })

  it('should handle URLs with different protocols', () => {
    expect(parseGitUrl('https://github.com/ajiu9/comuse.git')).toBe('https://github.com/ajiu9/comuse')
    expect(parseGitUrl('http://github.com/ajiu9/comuse.git')).toBe('https://github.com/ajiu9/comuse')
    expect(parseGitUrl('git://github.com/ajiu9/comuse.git')).toBe('https://github.com/ajiu9/comuse')
    expect(parseGitUrl('git+https://github.com/ajiu9/comuse.git')).toBe('https://github.com/ajiu9/comuse')
  })

  it('should handle URLs without .git suffix', () => {
    expect(parseGitUrl('https://github.com/ajiu9/comuse')).toBe('https://github.com/ajiu9/comuse')
    expect(parseGitUrl('git@github.com:ajiu9/comuse')).toBe('https://github.com/ajiu9/comuse')
  })

  it('should handle URLs with subdirectories', () => {
    expect(parseGitUrl('https://github.com/ajiu9/comuse/packages/shared')).toBe('https://github.com/ajiu9/comuse')
    expect(parseGitUrl('git@github.com:ajiu9/comuse/packages/shared')).toBe('https://github.com/ajiu9/comuse')
  })

  it('should handle unknown hosts with default protocol', () => {
    expect(parseGitUrl('https://unknown.com/ajiu9/comuse.git')).toBe('https://unknown.com/ajiu9/comuse')
    expect(parseGitUrl('git@unknown.com:ajiu9/comuse.git')).toBe('http://unknown.com/ajiu9/comuse')
  })
})
