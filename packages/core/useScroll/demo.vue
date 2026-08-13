<script setup lang="ts">
import { useScroll } from 'comuse-core'
import { computed, nextTick, shallowRef, toRefs } from 'vue'

const el = shallowRef<HTMLElement | null>(null)
const smooth = shallowRef(false)
const behavior = computed(() => smooth.value ? 'smooth' : 'auto')
const { x, y, isScrolling, arrivedState, directions, measure } = useScroll(el, { behavior })
const { left, right, top, bottom } = toRefs(arrivedState)
const { left: toLeft, right: toRight, top: toTop, bottom: toBottom } = toRefs(directions)

const displayX = computed({
  get() {
    return x.value.toFixed(1)
  },
  set(val) {
    x.value = Number.parseFloat(val)
  },
})

const displayY = computed({
  get() {
    return y.value.toFixed(1)
  },
  set(val) {
    y.value = Number.parseFloat(val)
  },
})

const height = shallowRef<'h-[500px]' | 'h-[200px]'>('h-[500px]')
function updateScrollPosition() {
  height.value = height.value === 'h-[500px]' ? 'h-[200px]' : 'h-[500px]'
  nextTick(() => {
    measure()
  })
}
</script>

<template>
  <div class="flex">
    <div ref="el" class="w-300px h-300px m-auto overflow-scroll bg-gray-500/5 rounded">
      <div class="w-500px relative" :class="height">
        <div position="absolute left-0 top-0" bg="gray-500/5" p="x-2 y-1">
          TopLeft
        </div>
        <div position="absolute left-0 bottom-0" bg="gray-500/5" p="x-2 y-1">
          BottomLeft
        </div>
        <div position="absolute right-0 top-0" bg="gray-500/5" p="x-2 y-1">
          TopRight
        </div>
        <div position="absolute right-0 bottom-0" bg="gray-500/5" p="x-2 y-1">
          BottomRight
        </div>
        <div position="absolute left-1/3 top-1/3" bg="gray-500/5" p="x-2 y-1">
          Scroll Me
        </div>
      </div>
    </div>
    <div class="m-auto w-280px pl-4">
      <div class="px-6 py-4 rounded grid grid-cols-[120px_auto] gap-2 bg-gray-500/5">
        <span text="right" opacity="75" class="py-4">X Position</span>
        <div class="text-primary">
          <input v-model="displayX" type="number" min="0" max="200" step="10" class="w-full !min-w-0">
        </div>
        <span text="right" opacity="75" class="py-4">Y Position</span>
        <div class="text-primary">
          <input v-model="displayY" type="number" min="0" max="100" step="10" class="w-full !min-w-0">
        </div>
        <div class="col-span-full flex items-center justify-between">
          Measure
          <button @click="updateScrollPosition">
            Toggle height
          </button>
        </div>
        <label for="smooth-scrolling-option" class="whitespace-nowrap" text="right" opacity="75">Smooth scrolling</label>
        <input id="smooth-scrolling-option" v-model="smooth" type="checkbox">
        <span text="right" opacity="75">isScrolling</span>
        <span :class="isScrolling ? 'text-green-500' : 'text-gray-400'">{{ isScrolling }}</span>
        <div text="right" opacity="75">
          Top Arrived
        </div>
        <span :class="top ? 'text-green-500' : 'text-gray-400'">{{ top }}</span>
        <div text="right" opacity="75">
          Right Arrived
        </div>
        <span :class="right ? 'text-green-500' : 'text-gray-400'">{{ right }}</span>
        <div text="right" opacity="75">
          Bottom Arrived
        </div>
        <span :class="bottom ? 'text-green-500' : 'text-gray-400'">{{ bottom }}</span>
        <div text="right" opacity="75">
          Left Arrived
        </div>
        <span :class="left ? 'text-green-500' : 'text-gray-400'">{{ left }}</span>
        <div text="right" opacity="75">
          Scrolling Up
        </div>
        <span :class="toTop ? 'text-blue-500' : 'text-gray-400'">{{ toTop }}</span>
        <div text="right" opacity="75">
          Scrolling Right
        </div>
        <span :class="toRight ? 'text-blue-500' : 'text-gray-400'">{{ toRight }}</span>
        <div text="right" opacity="75">
          Scrolling Down
        </div>
        <span :class="toBottom ? 'text-blue-500' : 'text-gray-400'">{{ toBottom }}</span>
        <div text="right" opacity="75">
          Scrolling Left
        </div>
        <span :class="toLeft ? 'text-blue-500' : 'text-gray-400'">{{ toLeft }}</span>
      </div>
    </div>
  </div>
</template>
