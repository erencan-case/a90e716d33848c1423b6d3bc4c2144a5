<template>
  <div class="container m-auto">
    <div class="flex items-center justify-around">
      <div class="basis-1/2">
        <el-card class="mt-32 mb-8 rounded-2xl p-8 overflow-visible">
          <vue-paycard class="-mt-44 mb-8" :is-card-flipped="true" :value-fields="form.card"
                       :is-card-number-masked="false"></vue-paycard>
          <div class="font-bold text-2xl">Kart Bilgileri</div>
          <hr>
          <div>
            <el-input
                id="v-card-number" data-card-field
                v-model="form.card.cardNumber"
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
                v-model="form.card.cardName"
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
              <el-select id="v-card-month" data-card-field placeholder="Ay" v-model="form.card.cardMonth">
                <el-option :value="index" :label="index<=9?'0'+index:index" v-for="index in 12">
                  {{ index <= 9 ? '0' + index : index }}
                </el-option>
              </el-select>
              <el-select id="v-card-year" data-card-field placeholder="Yıl" v-model="form.card.cardYear">
                <el-option :value="index+2021" v-for="index in 10">{{ index + 2021 }}</el-option>
              </el-select>
              <el-input id="v-card-cvv" data-card-field v-model="form.card.cardCvv" placeholder="CVV">
              </el-input>
            </div>
            <div></div>
            <div></div>
          </div>
        </el-card>
      </div>
      <div class="basis-1/3">
        <el-card class="rounded-2xl p-8">
          <div class="text-2xl"><b>Bospphorus Otel</b> (İstanbul)</div>
          <hr class="mb-8">
          <div class="flex m-4 justify-between">
            <div>
              <div class="font-bold">Giriş Tarihi</div>
              <div>12 Mart 1990</div>
            </div>
            <div class="text-right">
              <div class="font-bold">Çıkış Tarihi</div>
              <div>12 Mart 1990</div>
            </div>
          </div>
          <div class="flex m-4 justify-between">
            <div>
              <div class="font-bold">Yetişkin Sayısı</div>
              <div>2 Yetişkin</div>
            </div>
            <div class="text-right">
              <div class="font-bold">Çocuk Sayısı</div>
              <div>1 Çocuk</div>
            </div>
          </div>
          <div class="flex m-4 justify-between">
            <div>
              <div class="font-bold">Oda Tipi</div>
              <div>Deluxe</div>
            </div>
            <div class="text-right">
              <div class="font-bold">Manzara</div>
              <div>Deniz Manzaralı</div>
            </div>
          </div>
          <div class="flex p-4 rounded-2xl bg-slate-100">
            <div class="flex-1"><el-input size="large"></el-input></div>
            <div><SecondaryButton>Kupon Kodu</SecondaryButton></div>
          </div>
          <div class="mt-4 p-4 rounded-2xl bg-slate-100">
            <div class="flex m-4 justify-between">
                <div class="font-bold">Oda Fiyatı</div>
                <div>1.127 TL</div>
            </div>
            <div class="flex m-4 justify-between">
                <div class="font-bold">Fiyat Etki Oranı</div>
                <div>%36</div>
            </div>
            <div class="flex m-4 justify-between">
              <div><b>Konaklama</b> (5 Gün)</div>
                <div>5.127 TL</div>
            </div>
            <div class="flex m-4 justify-between">
              <div><b>İndirim</b> (CODE100)</div>
                <div>-100 TL</div>
            </div>
            <hr>
            <div class="text-center m-4">
              <div class="text-xl">Toplam Tutar</div>
              <div class="text-2xl font-bold">2.431 TL</div>
            </div>
          </div>

        </el-card>
      </div>
    </div>
    <div
        class="flex rounded-2xl justify-between my-4 p-8 border border-slate-300 bg-slate-200 shadow-slate-500/20 shadow-2xl ">
      <secondary-button @click="setStep('SelectScene')">Geri Dön</secondary-button>
      <primary-button @click="makePayment(form)">Ödeme Yap ve Bitir</primary-button>
    </div>
  </div>
</template>

<script setup>
import {CreditCard, UserFilled} from '@element-plus/icons-vue'
</script>

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
          cardName: "",
          cardNumber: "",
          cardMonth: "",
          cardYear: "",
          cardCvv: "",
        }
      }
    }
  },
  components: {SecondaryButton, PrimaryButton},
  methods: {
    updateValue(e) {
      console.log(this.form.card.cardNumber.length)
      console.log(e.length)
      if ([4, 9, 14].includes(e.length)) {
        this.form.card.cardNumber += ' '
        console.log('added')
      }
    },
    removeCard() {
      console.log(this.form.card.cardNumber.length)
      if ([5, 10, 15].includes(this.form.card.cardNumber.length)) {
        this.form.card.cardNumber = this.form.card.cardNumber.slice(0, -1)
      }
    },
    ...mapActions(
        ["setStep", "makePayment"]
    )
  }
}
</script>

<style scoped>

</style>
