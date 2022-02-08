<template>
  <div class="make-payment">
    <div class="make-payment-container">
      <div class="basis-1/2">
        <el-card class="make-payment-card-details">
          <vue-paycard class="-mt-44 mb-8" :is-card-flipped="true" :value-fields="order.card"
                       :is-card-number-masked="false"></vue-paycard>
          <div class="font-bold text-2xl">Kart Bilgileri</div>
          <hr>
          <div>
            <el-input
                id="v-card-number" data-card-field
                v-model="order.card.cardNumber"
                class="my-4"
                size="large"
                @input="updateValue"
                @keyup.delete="removeCard"
                placeholder="Kart Numarası"
                :prefix-icon="creditCard"
            >

              <template #prepend>
                <div class="w-28 flex gap-2">
                  <div>
                    <CreditCard width="18" height="18"></CreditCard>
                  </div>
                  <div>Kart Numarası</div>
                </div>
              </template>
            </el-input>
          </div>
          <div>
            <el-input
                id="v-card-name" data-card-field
                v-model="order.card.cardName"
                class="my-4"
                size="large"
                @input="updateValue"
                @keyup.delete="removeCard"
                placeholder="Kart Sahibi"
            >
              <template #prepend>
                <div class="w-28 flex gap-2">
                  <div>
                    <UserFilled width="18" height="18"></UserFilled>
                  </div>
                  <div>Kart Sahibi</div>
                </div>
              </template>
            </el-input>
          </div>
          <div>
            <div class="flex gap-4">
              <el-select id="v-card-month" data-card-field placeholder="Ay" v-model="order.card.cardMonth">
                <el-option :value="index" :label="index<=9?'0'+index:index" v-for="index in 12">
                  {{ index <= 9 ? '0' + index : index }}
                </el-option>
              </el-select>
              <el-select id="v-card-year" data-card-field placeholder="Yıl" v-model="order.card.cardYear">
                <el-option :value="index+2021" v-for="index in 10">{{ index + 2021 }}</el-option>
              </el-select>
              <el-input id="v-card-cvv" data-card-field v-model="order.card.cardCvv" placeholder="CVV">
              </el-input>
            </div>
            <div></div>
            <div></div>
          </div>
        </el-card>
      </div>
      <div class="basis-1/3">
        <el-card class="rounded-2xl p-8">
          <order-details :coupon-code="true" :order="order"></order-details>
        </el-card>
      </div>
    </div>
    <div
        class="make-payment-footer">
      <secondary-button @click="setStep('SelectScene')">Geri Dön</secondary-button>
      <primary-button
          :disabled="!order.card.cardCvv || !order.card.cardMonth || !order.card.cardName || !order.card.cardNumber || !order.card.cardYear"
          @click="placeOrder(order)">Ödeme Yap ve Bitir
      </primary-button>
    </div>
  </div>
</template>

<script setup>
import {CreditCard, UserFilled} from '@element-plus/icons-vue'
import OrderDetails from "../components/OrderDetails.vue";
</script>

<script>
import {mapActions, mapState} from "vuex";
import PrimaryButton from "../components/PrimaryButton.vue";
import SecondaryButton from "../components/SecondaryButton.vue";

export default {
  name: "MakePayment",
  components: {SecondaryButton, PrimaryButton},
  computed: {
    ...mapState({
      order: state => state.order,
    })
  },
  methods: {
    updateValue(e) {
      if ([4, 9, 14].includes(e.length)) {
        this.order.card.cardNumber += ' '
      }
    },
    removeCard() {
      if ([5, 10, 15].includes(this.order.card.cardNumber.length)) {
        this.order.card.cardNumber = this.order.card.cardNumber.slice(0, -1)
      }
    },
    placeOrder(order) {
      this.makePayment(order).then(res => {
        if (res === 201) {
          this.$notify({
            title: 'Başarılı',
            message: 'Rezervasyonunuz başarılı bir şekilde oluşturuldu.',
            type: 'success',
          })
          this.setStep('ReviewReservation')
        }
        else if(res===200) {
          this.$notify({
            title: 'Güncelleme Başarılı',
            message: 'Rezervasyonunuz başarılı bir şekilde güncellendi.',
            type: 'success',
          })
          this.setStep('ReviewReservation')
        }
        else {
          this.$notify({
            title: 'Hata',
            message: 'Ödeme aşamasında bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.',
            type: 'error',
          })
        }
      })
    },
    ...mapActions(
        ["setStep", "makePayment", "setStep"]
    )
  }
}
</script>

<style lang="scss" scoped>
.make-payment {
  @apply container m-auto;
  &-container {
    @apply flex flex-col lg:flex-row items-center justify-around;
  }
  &-card-details {
    @apply mt-32 mb-8 rounded-2xl p-8 overflow-visible;
  }
  &-footer {
    @apply flex rounded-2xl justify-between my-4 p-8 border border-slate-300 bg-slate-200 shadow-slate-500/20 shadow-2xl;
  }
}
</style>
