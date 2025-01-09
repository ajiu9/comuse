export function parseTime(time: any, fmt: string): string | null {
  if (arguments.length === 0)
    return null

  let date
  if (typeof time === 'object')
    date = time
  else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time)))
      time = parseInt(time)

    if ((typeof time === 'number') && (time.toString().length === 10))
      time = time * 1000

    date = new Date(time)
  }

  if (isNaN(date.getTime()))
    return null

  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))

  const o: { [key: string]: number } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = `${o[k]}`
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

/**
 * Formats time based on the provided option.
 *
 * @param {number | string} time - The time value to format.
 * @param {string | undefined} option - Optional format string.
 * @returns {string} - Formatted time string.
 */
export function formatTime(time: number | string | Date, option?: string): string | null {
  if (typeof time === 'string' && time.length === 10)
    time = parseInt(time) * 1000
  else if (typeof time === 'number' && time.toString().length === 10)
    time = time * 1000
  else
    time = +time

  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d.getTime()) / 1000

  if (diff < 30) return '刚刚'
  if (diff < 3600) return `${Math.ceil(diff / 60)}分钟前`
  if (diff < 3600 * 24) return `${Math.ceil(diff / 3600)}小时前`
  if (diff < 3600 * 24 * 2) return '1天前'

  if (option) return parseTime(time, option)

  return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`
}

function padLeftZero(str: string): string {
  return str.padStart(2, '0')
}
