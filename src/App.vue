<template>
  <div class="flex items-center justify-between bg-slate-700 p-4 text-white">
    <div>OTEL<b>REZ</b></div>
    <div><secondary-button>Yeni Rezervasyon</secondary-button></div>
  </div>
  <div>
    <step-progress></step-progress>
    <component v-if="currentStep" :is="currentStep"></component>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import SelectHotel from "./views/SelectHotel.vue";
import SelectScene from "./views/SelectScene.vue";
import MakePayment from "./views/MakePayment.vue";
import ReviewReservation from "./views/ReviewReservation.vue";
import StepProgress from "./views/StepProgress.vue";
import SecondaryButton from "./components/SecondaryButton.vue";

export default {
  components: {SecondaryButton, StepProgress, SelectScene, SelectHotel, MakePayment, ReviewReservation},
  computed: {
    ...mapState({
      currentStep: state => state.currentStep,
    })
  }
}
</script>
<style>
body {
  @apply bg-slate-50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
