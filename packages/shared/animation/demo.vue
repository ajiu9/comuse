<script type="ts" setup>
import { Animation, ease, TimeLine } from 'comuse-shared'
import { ref } from 'vue'

const el = ref(null)
const el1 = ref(null)
const tl = new TimeLine()
tl.start()

const add = () => {
  tl.add(new Animation({
    object: el.value.style,
    property: 'transform',
    startValue: 0,
    endValue: 500,
    duration: 2000,
    timingFunction: ease,
    template: v => `translateX(${v}px)`,
  }))

  if (el1.value) {
    el1.value.style.transition = 'transform ease 2s'
    el1.value.style.transform = 'translateX(500px)'
  }
}
const reset = () => {
  tl.reset()
  el.value.style.transition = null
  el.value.style.transform = null

  el1.value.style.transform = 'translateX(0px)'
  el1.value.style.transition = null
  el1.value.style.transform = 'translateX(0px)'
}
</script>

<template>
  <p class="font-bold">
    TimeLine Animation
  </p>
  <div ref="el" class="h-100px w-100px bg-red" mb-4 />
  <p class="font-bold">
    Browser Css Animation
  </p>
  <div ref="el1" class="h-100px w-100px bg-blue" />
  <button @click="add">
    add
  </button>
  <button @click="reset">
    reset
  </button>

  <button @click="() => tl.pause()">
    pause
  </button>
  <button @click="() => tl.resume()">
    resume
  </button>
</template>
