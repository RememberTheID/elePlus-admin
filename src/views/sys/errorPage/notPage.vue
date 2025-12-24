<template>
  <div class="w-full h-full">
    <div class="flex flex-col items-center  w-full h-full gap-6">
      <DotLottieVue class="w-6/12 mt-24" autoplay loop :src="LottieJson" />
      <el-button type="default" @click="router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import LottieJson from './lib/HQS5BzpG8q.lottie'
const router = useRouter()
</script>