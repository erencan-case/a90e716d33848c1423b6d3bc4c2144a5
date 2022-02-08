<template>
  <div>
    <el-steps class="py-8 flex-col sm:flex-row gap-4" :space="200" :active="1" simple>
      <el-step :status="stepStatus('SelectHotel')" title="Otel Seçimi" :icon="HomeFilled"></el-step>
      <el-step :status="stepStatus('SelectScene')" title="Oda Tipi ve Manzara Seçimi" :icon="PictureFilled"></el-step>
      <el-step :status="stepStatus('MakePayment')" title="Özet ve Ödeme Bilgileri" :icon="CircleCheckFilled"></el-step>
    </el-steps>
  </div>
</template>

<script setup>
import {HomeFilled, PictureFilled, CircleCheckFilled} from '@element-plus/icons-vue'
</script>

<script>
import {mapState} from "vuex";

export default {
  name: "StepProgress",
  computed: {
    ...mapState({
      currentStep: state => state.currentStep,
    })
  },
  methods: {
    stepStatus(val) {
      return val === this.currentStep ? 'process' : 'wait'
    },
  }
}
</script>