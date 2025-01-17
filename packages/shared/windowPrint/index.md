---
category: Browser
---

# Browser

Print using window.print via an iframe.

## Usage

```ts
import { formatTime, windowPrint } from 'comuse-shared'

const strStyle = '<style>*{color: #000; font-size: 14px; line-height: 23px; padding: 0; margin: 0; line-height: 1.4;} tr>th, tr>td {padding: 5px 2px; text-align: center;} .bar {padding: 10px 24px; background-color: #fff; border-bottom: 1px solid #dce3e4;}</style>'
const strHtml = `<div class="print-wrapper">
      <div class="bar">
        <h2 style="text-align: center; font-size: 18px; color: #737373;">${this.title}</h2>
      </div>
      <div class="bar">
        <div style="padding-right: 70px; line-height: 18px; font-size: 12px;">
          <span style="margin-right: 10px">Enterprise：Test</span>
          <span style="margin-right: 10px">Time：${formatTime(new Date(), 'yyyy-MM-dd')}</span>
        </div>
        <div style="float: right; line-height: 18px; margin-top: -18px;">unit：¥</div>
      </div>
      <table border=1 cellSpacing=0 cellPadding=1 width="100%" style="border-collapse:collapse" bordercolor="#333333">
        <thead>${this._getTHeader()}</thead>
        <tbody>
          ${this._getTBody()}
          ${this._getTFooter()}
        </tbody>
      </table>
      <div style="margin-top: 20px; text-align: right; padding-right: 120px;"><span>（Sign）：</span></div>
    </div>`

windowPrint()
```
