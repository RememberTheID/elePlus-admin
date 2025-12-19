<template>
  <div ref="waterContainerRef" class="water-container">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useWaterBg } from './index'

const props = defineProps({
  text: {
    type: String,
    default: '机密水印'
  },
  gap: {
    type: Number,
    default: 200
  },
  fontSize: {
    type: Number,
    default: 16
  },
  angle: {
    type: Number,
    default: -20
  },
  color: {
    type: String,
    default: 'rgba(180, 180, 180, 0.3)'
  },
  describe: {
    type: String,
    default: '仅本项目使用'
  }
});
const bgUrl = useWaterBg(props)
const waterContainerRef = ref(null)
const WATERMARK_CLASS = 'vue-watermark-overlay';
let observer = null;

const renderWatermark = () => {
  const container = waterContainerRef.value;
  if (!container || !bgUrl.value) return;

  if (observer) observer.disconnect();
  container.querySelector(`.${WATERMARK_CLASS}`)?.remove();

  const watermark = document.createElement('div');
  watermark.className = WATERMARK_CLASS;
  watermark.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999999;
    pointer-events:none;background-repeat:repeat;display:block!important;
    visibility:visible!important;opacity:1!important;
    background-image:url(${bgUrl.value});
    background-size:${props.gap * 2}px ${props.gap * 2}px;
  `;
  container.appendChild(watermark);

  observer = new MutationObserver(() => renderWatermark());
  observer.observe(container, {
    attributes: true, subtree: true, childList: true, attributeFilter: ['style', 'class']
  });
};

onMounted(renderWatermark);
watch(() => bgUrl.value, renderWatermark);
onUnmounted(() => observer?.disconnect());
</script>

<style scoped></style>
