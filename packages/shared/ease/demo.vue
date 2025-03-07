<script type="ts" setup>
import { Animation, ease, easeIn, easeInOut, easeOut, linear, TimeLine } from 'comuse-shared'
import { ref } from 'vue'

const elLinear = ref(null)
const elEase = ref(null)
const elEaseIn = ref(null)
const elEaseOut = ref(null)
const elEaseInOut = ref(null)

const timeline = new TimeLine()

const start = () => {
  const els = [elLinear.value, elEase.value, elEaseIn.value, elEaseOut.value, elEaseInOut.value]
  const timingFunctions = [linear, ease, easeIn, easeOut, easeInOut]
  for (let i = 0; i < els.length; i++) {
    timeline.add(new Animation({
      object: els[i].style,
      property: 'transform',
      startValue: 0,
      endValue: 500,
      duration: 2000,
      timingFunction: timingFunctions[i],
      template: v => `translateX(${v}px)`,
    }))
  }
  timeline.start()
}

const resume = () => {
  timeline.resume()
}

const pause = () => {
  console.log(timeline.getState())
  timeline.pause()
  console.log(timeline.getState())
}

const reset = () => {
  timeline.reset()
}
</script>

<template>
  <p class="font-bold">
    linear
  </p>
  <div ref="elLinear" class="h-50px w-50px bg-red-400" mb-4 />
  <p class="font-bold">
    ease
  </p>
  <div ref="elEase" class="h-50px w-50px bg-blue-400" mb-4 />
  <p class="font-bold">
    easeIn
  </p>
  <div ref="elEaseIn" class="h-50px w-50px bg-green-400" mb-4 />
  <p class="font-bold">
    easeOut
  </p>
  <div ref="elEaseOut" class="h-50px w-50px bg-yellow-400" mb-4 />
  <p class="font-bold">
    easeInOut
  </p>
  <div ref="elEaseInOut" class="h-50px w-50px bg-purple-400" mb-4 />
  <button @click="start">
    start
  </button>
  <button @click="pause">
    pause
  </button>
  <button @click="resume">
    resume
  </button>
  <button @click="reset">
    reset
  </button>
</template>
