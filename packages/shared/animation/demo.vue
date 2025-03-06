<script type="ts" setup>
import { Animation, ease, TimeLine } from 'comuse-shared'
import { onMounted, ref } from 'vue'

const el = ref(null)
const el1 = ref(null)
const tl = new TimeLine()
tl.start()

onMounted(() => {
  tl.add(new Animation({
    object: el.value.style,
    property: 'transform',
    startValue: 0,
    endValue: 500,
    duration: 2000,
    easing: ease,
    template: v => `translateX(${v}px)`,
  }))

  if (el1.value) {
    el1.value.style.transition = 'transform ease 2s'
    el1.value.style.transform = 'translateX(500px)'
  }
})
</script>

<template>
  <div ref="el" class="h-100px w-100px bg-red " />
  <div ref="el1" class="h-100px w-100px bg-blue" />

  <button @click="() => tl.pause()">
    pause
  </button>
  <button @click="() => tl.resume()">
    resume
  </button>
</template>
