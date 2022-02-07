<template>
<div class="flex justify-center">
  <el-card class="p-8 mt-8 rounded-2xl text-center max-w-screen-sm flex justify-center">
    <div class="flex justify-center text-green-500"><Calendar width="64" height="64"></Calendar></div>
    <div class="font-bold m-2">Rezervasyon kaydınız alınmıştır.</div>
    <div>Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.</div>
    <div class="flex gap-4 mt-8">
      <div><PrimaryButton>Yeni Rezervasyon Yap</PrimaryButton></div>
      <div><PrimaryButton>Rezervasyonu Güncelle</PrimaryButton></div>
      <div><PrimaryButton>Rezervasyonu İptal Et</PrimaryButton></div>
    </div>
  </el-card>
</div>
</template>
<script setup>
import {Calendar} from '@element-plus/icons-vue'
</script>
<script>
import PrimaryButton from "../components/PrimaryButton.vue";

export default {
  name: "ReviewReservation",
  components: {PrimaryButton}
}
</script>

<style scoped>

</style>
