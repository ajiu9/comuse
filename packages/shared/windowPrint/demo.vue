<script setup lang="ts">
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>省份</th>
          <th>2020年</th>
          <th>2021年</th>
          <th>2022年</th>
          <th>2023年</th>
          <th>2024年</th>
        </tr>
      </thead>
      <tbody>
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
