const typeOfNumber = (num: number | string) => typeof num === 'number' ? num : parseFloat(num.toString())

export interface CompareNumbersResult {
  isEqual: boolean
  isLess: boolean
  isGreater: boolean
  isLessOrEqual: boolean
  isGreaterOrEqual: boolean
}

export const compareNumbers = (num1: number | string, num2: number | string, precision = 12): CompareNumbersResult => {
  const parsedNum1 = typeOfNumber(num1)
  const parsedNum2 = typeOfNumber(num2)

  if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
    return {
      isEqual: false,
      isLess: false,
      isGreater: false,
      isLessOrEqual: false,
      isGreaterOrEqual: false,
    }
  }

  const diff = parsedNum1 - parsedNum2
  const isEqual = Math.abs(diff) < 10 ** -precision

  return {
    isEqual,
    isLess: diff < -(10 ** -precision),
    isGreater: diff > 10 ** -precision,
    isLessOrEqual: diff <= 10 ** -precision,
    isGreaterOrEqual: diff >= -(10 ** -precision),
  }
}
