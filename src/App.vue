<template>
  <div class="header">
    <div>OTEL<b>REZ</b></div>
    <div>
      <secondary-button @click="newReservation">Yeni Rezervasyon</secondary-button>
    </div>
  </div>
  <div>
    <step-progress v-if="currentStep!=='ReviewReservation'"></step-progress>
    <component v-if="currentStep" :is="currentStep"></component>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import SelectHotel from "./views/SelectHotel.vue";
import SelectScene from "./views/SelectScene.vue";
import MakePayment from "./views/MakePayment.vue";
import ReviewReservation from "./views/ReviewReservation.vue";
import StepProgress from "./components/StepProgress.vue";
import SecondaryButton from "./components/SecondaryButton.vue";
import store from "../store";

export default {
  components: {SecondaryButton, StepProgress, SelectScene, SelectHotel, MakePayment, ReviewReservation},
  computed: {
    ...mapState({
      currentStep: state => state.currentStep,
    })
  },
  methods: {
    ...mapActions(
        ["newReservation"]
    )
  },
  beforeCreate() {
    store.commit('initialiseStore');
  }
}
</script>
<style lang="scss">
body {
  @apply bg-slate-50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .header {
    @apply flex items-center justify-between bg-slate-700 p-4 text-white;
  }
}
</style>
