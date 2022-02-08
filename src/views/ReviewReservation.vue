<template>
<div class="review-reservation">
  <el-card class="review-reservation-card">
    <div class="flex justify-center text-green-500"><Calendar width="64" height="64"></Calendar></div>
    <div class="font-bold m-2">Rezervasyon kaydınız alınmıştır.</div>
    <div>Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.</div>
    <div class="flex flex-col sm:flex-row gap-4 mt-8">
      <div><PrimaryButton @click="newReservation">Yeni Rezervasyon Yap</PrimaryButton></div>
      <div><PrimaryButton @click="setStep('SelectHotel')">Rezervasyonu Güncelle</PrimaryButton></div>
      <div><PrimaryButton @click="removeReservation">Rezervasyonu İptal Et</PrimaryButton></div>
    </div>
  </el-card>
  <el-card class="review-reservation-details">
    <order-details :coupon-code="false" :order="order"></order-details>
  </el-card>
</div>
</template>
<script setup>
import {Calendar} from '@element-plus/icons-vue'
import OrderDetails from "../components/OrderDetails.vue";
</script>
<script>
import PrimaryButton from "../components/PrimaryButton.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "ReviewReservation",
  components: {PrimaryButton},
  computed: {
    ...mapState({
      order: state => state.order,
    })
  },
  methods: {
    removeReservation() {
      this.cancelReservation(this.order).then(res=> {
        if(res === 200) {
          this.$notify({
            title: 'İptal edildi',
            message: 'Rezervasyon başarılı bir şekilde iptal edildi.',
            type: 'success',
            duration: 0
          })
          this.setStep('SelectHotel')
        }
        else {
          this.$notify({
            title: 'İptal edilemedi',
            message: 'İptal işlemi sırasında bir hata ile karşılaşıldı.',
            type: 'error',
            duration: 0
          })
        }
      })
    },
    ...mapActions(
        ["newReservation", "cancelReservation", "setStep"]
    )
  }

}
</script>

<style lang="scss" scoped>
.review-reservation {
  @apply flex flex-col items-center justify-center;
  &-card {
    @apply p-8 mt-8 rounded-2xl text-center max-w-screen-sm flex justify-center;
  }
  &-details {
    @apply p-8 mt-8 rounded-2xl text-center max-w-screen-sm flex justify-center;
  }
}
</style>
