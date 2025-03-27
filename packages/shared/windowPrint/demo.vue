<script setup lang="ts">
import { formatTime, windowPrint } from 'comuse-shared'
import { ref } from 'vue'

const head = ref<HTMLElement | null>(null)
const body = ref<HTMLElement | null>(null)

const strStyle = '<style>*{color: #000; font-size: 14px; line-height: 23px; padding: 0; margin: 0; line-height: 1.4;} tr>th, tr>td {padding: 5px 2px; text-align: center;} .bar {padding: 10px 24px; background-color: #fff; border-bottom: 1px solid #dce3e4;}</style>'

const print = () => {
  windowPrint(
    `${strStyle
    }<div class="print-wrapper">
      <div class="bar">
        <h2 style="text-align: center; font-size: 18px; color: #737373;">Print Test</h2>
      </div>
      <div class="bar">
        <div style="padding-right: 70px; line-height: 18px; font-size: 12px;">
          <span style="margin-right: 10px">Enterprise：Test</span>
          <span style="margin-right: 10px">Time：${formatTime(new Date(), 'yyyy-MM-dd')}</span>
        </div>
        <div style="float: right; line-height: 18px; margin-top: -18px;">unit：¥</div>
      </div>
      <table border=1 cellSpacing=0 cellPadding=1 width="100%" style="border-collapse:collapse" bordercolor="#333333">
        ${head.value?.innerHTML}
        ${body.value?.innerHTML}
      </table>
      <div style="margin-top: 20px; text-align: right; padding-right: 120px;"><span>（Sign）：</span></div>
    </div>`,
  )
}
</script>

<template>
  <div>
    <table>
      <thead ref="head">
        <tr>
          <th>省份</th>
          <th>2020年</th>
          <th>2021年</th>
          <th>2022年</th>
          <th>2023年</th>
          <th>2024年</th>
        </tr>
      </thead>
      <tbody ref="body">
        <tr>
          <td>北京</td>
          <td>145,603</td>
          <td>158,200</td>
          <td>168,900</td>
          <td>178,500</td>
          <td>186,000</td>
        </tr>
        <tr>
          <td>上海</td>
          <td>140,320</td>
          <td>153,800</td>
          <td>163,400</td>
          <td>172,100</td>
          <td>180,500</td>
        </tr>
        <tr>
          <td>广东</td>
          <td>112,450</td>
          <td>124,600</td>
          <td>135,800</td>
          <td>145,800</td>
          <td>155,200</td>
        </tr>
        <tr>
          <td>江苏</td>
          <td>103,200</td>
          <td>114,300</td>
          <td>125,600</td>
          <td>134,500</td>
          <td>142,800</td>
        </tr>
        <tr>
          <td>浙江</td>
          <td>101,800</td>
          <td>112,400</td>
          <td>123,100</td>
          <td>132,900</td>
          <td>141,200</td>
        </tr>
        <tr>
          <td>山西</td>
          <td>64,850</td>
          <td>68,200</td>
          <td>71,500</td>
          <td>74,800</td>
          <td>78,300</td>
        </tr>
      </tbody>
    </table>

    <p style="text-align:center;color:#666">
      数据来源：国家统计局及地方统计公报（示例数据）
    </p>
  </div>
  <button @click="print">
    Print
  </button>
</template>

<style>
        table {
  border-collapse: collapse;
  width: 80%;
  margin: 20px auto;
}
th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}
th {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #f5f5f5;
}
</style>
