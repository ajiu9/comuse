<script setup lang="ts">
import { camelToSnake, convertObjectKeys, snakeToCamel } from 'comuse-shared'
import { ref } from 'vue'

const data1 = ref({
  first_name: 'John',
  last_name: 'Doe',
  age: 30,
  address: {
    street_name: 'Main St',
    city: 'Anytown',
    state: 'CA',
    zip_code: '12345',
  },
})

const data2 = ref({
  firstName: 'Jane',
  lastName: 'Doe',
  age: 25,
  address: {
    streetName: 'Second St',
    city: 'Othertown',
    state: 'NY',
    zipCode: '67890',
  },
})
</script>

<template>
  <div>
    <div>
      <h4>Original Data1</h4>
      <code>{{ data1 }}</code>

      <h4>Converted to Camel Case</h4>
      <code>{{ convertObjectKeys(data1, snakeToCamel) }}</code>
    </div>
    <div>
      <h4>Original Data2</h4>
      <code>{{ data2 }}</code>
      <h4>Converted to Snake Case</h4>
      <code>{{ convertObjectKeys(data2, camelToSnake) }}</code>
    </div>
  </div>
</template>
