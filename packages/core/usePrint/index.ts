import { windowPrint } from 'comuse-shared'

export function usePrint() {
  let html = ''

  const getElementSrt = (element: { querySelector: (arg0: any) => any }, selector: any) => {
    const el = element.querySelector(selector)
    return el ? el.cloneNode(true).innerHTML : ''
  }

  const getTableStyle = () => {
    return `<style>*{color: #000; font-size: 14px; line-height: 23px; padding: 0; margin: 0; line-height: 1.4;} tr>th, tr>td {padding: 5px 2px; text-align: center;} .bar {padding: 10px 24px; background-color: #fff; border-bottom: 1px solid #dce3e4;}</style>`
  }

  const addHtmlContent = ({ content }: { content: string }) => {
    html = `<div class="print-wrapper">${content}</div>`
  }

  const getTableContent = (thead: string, tbody: string) => {
    return `<table border=1 cellSpacing=0 cellPadding=1 width="100%" style="border-collapse:collapse" bordercolor="#333333">
      <thead>${thead}</thead>
      <tbody>${tbody}</tbody>
    </table>`
  }

  const getSubTitStr = (tit: string) => {
    return `<h2 style="height: 60px;line-height: 60px;font-size: 20px;text-align: center;">${tit}</h2>`
  }

  const print = () => {
    windowPrint(getTableStyle() + html)
  }

  return {
    getElementSrt,
    addHtmlContent,
    getTableContent,
    getSubTitStr,
    print,
  }
}
