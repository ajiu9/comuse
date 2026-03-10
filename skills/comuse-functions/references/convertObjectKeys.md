---
category: "Utilities"
---

# ConvertObjectKeys

## Usage

```ts
import { camelToSnake, convertObjectKeys } from 'comuse-shared'

const obj = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30
}

const result = convertObjectKeys(obj, camelToSnake) // { first_name: 'John', last_name: 'Doe', age: 30 }
```

## Type Declarations

```ts
/**
 * 格式化工具函数
 * 提供下划线命名和驼峰命名之间的转换
 */
/**
 * 将下划线命名转换为驼峰命名
 * 例如: virtual_card_no -> virtualCardNo
 * @param str 下划线命名的字符串
 * @returns 驼峰命名的字符串
 */
export declare function snakeToCamel(str: string): string
/**
 * 将驼峰命名转换为下划线命名
 * 例如: virtualCardNo -> virtual_card_no
 * @param str 驼峰命名的字符串
 * @returns 下划线命名的字符串
 */
export declare function camelToSnake(str: string): string
/**
 * 转换对象的键名格式
 * @param obj 要转换的对象
 * @param converter 转换函数 (snakeToCamel 或 camelToSnake)
 * @returns 转换后的新对象
 */
export declare function convertObjectKeys(
  obj: Record<string, any>,
  converter: (str: string) => string,
  recursive?: boolean,
): Record<string, any>
```
