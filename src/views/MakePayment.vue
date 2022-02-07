<template>
<div class="container m-auto">
  <div>
  </div>
  <div
      class="flex rounded-2xl justify-between my-4 p-8 border border-slate-300 bg-slate-200 shadow-slate-500/20 shadow-2xl ">
    <secondary-button @click="setStep('SelectScene')">Geri Dön</secondary-button>
    <primary-button @click="saveScene(form)">Kaydet ve Devam Et</primary-button>
  </div>
</div>
</template>

<script>
import {mapActions} from "vuex";
import PrimaryButton from "../components/PrimaryButton.vue";
import SecondaryButton from "../components/SecondaryButton.vue";

export default {
  name: "MakePayment",
  data() {
    return {
      form: {
        card: {
          cardName: "Eren",
          cardNumber: "123",
          cardMonth: "12",
          cardYear: "22",
          cardCvv: "32",
        }
      }
    }
  },
  components: {SecondaryButton, PrimaryButton},
  methods: {
    ...mapActions(
        ["setStep", "makePayment"]
    )
  }
}
</script>

<style scoped>

</style>