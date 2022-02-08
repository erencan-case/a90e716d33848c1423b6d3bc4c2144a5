<template>
  <div class="text-2xl"><b>{{ hotelName }}</b> ({{ hotelCity }})</div>
  <hr class="mb-8">
  <div class="flex m-4 gap-4 justify-between">
    <div class="text-left">
      <div class="font-bold">Giriş Tarihi</div>
      <div>{{
          new Intl.DateTimeFormat('tr-TR', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            weekday: 'long'
          }).format(new Date(order.selectedDates[0]))
        }}</div>
    </div>
    <div class="text-right">
      <div class="font-bold">Çıkış Tarihi</div>
      <div>{{
          new Intl.DateTimeFormat('tr-TR', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            weekday: 'long'
          }).format(new Date(order.selectedDates[1]))
        }}</div>
    </div>
  </div>
  <div class="flex m-4 justify-between">
    <div class="text-left">
      <div class="font-bold">Yetişkin Sayısı</div>
      <div>{{ order.selectedAdultSize }} Yetişkin</div>
    </div>
    <div v-if="order.selectedChildSize" class="text-right">
      <div class="font-bold">Çocuk Sayısı</div>
      <div>{{ order.selectedChildSize }} Çocuk</div>
    </div>
  </div>
  <div class="flex m-4 justify-between">
    <div class="text-left">
      <div class="font-bold">Oda Tipi</div>
      <div>{{ roomName }}</div>
    </div>
    <div class="text-right">
      <div class="font-bold">Manzara</div>
      <div>{{ scenicName }}</div>
    </div>
  </div>
  <div v-if="couponCode && !order.discount" class="flex p-4 rounded-2xl bg-slate-100">
    <div class="flex-1"><el-input v-model="order.discountCode" size="large"></el-input></div>
    <div><SecondaryButton @click="useDiscountCode">Kupon Kodu</SecondaryButton></div>
  </div>
  <div class="mt-4 p-4 rounded-2xl bg-slate-100">
    <div class="flex m-4 justify-between">
      <div class="font-bold">Oda Fiyatı</div>
      <div>{{ roomPrice }} TL</div>
    </div>
    <div class="flex m-4 justify-between">
      <div class="font-bold">Fiyat Etki Oranı</div>
      <div>%{{ scenicPrice }}</div>
    </div>
    <div class="flex m-4 justify-between">
      <div><b>Konaklama</b> ({{ order.selectedDayCount }} Gün)</div>
      <div>{{ roomTotal }} TL</div>
    </div>
    <div v-if="order.discount" class="flex m-4 justify-between">
      <div><b>İndirim</b> ({{ order.discountCode }})</div>
      <div>-{{ order.discount.discount_ammount }} TL <RemoveFilled v-if="couponCode" @click="removeDiscount" class="inline -mt-1" width="16" height="16"></RemoveFilled></div>
    </div>
    <hr>
    <div class="text-center m-4">
      <div class="text-xl">Toplam Tutar</div>
      <div class="text-2xl font-bold">{{ totalPrice }} TL</div>
    </div>
  </div>
</template>
<script setup>
import 'element-plus/theme-chalk/el-notification.css'
import {RemoveFilled} from "@element-plus/icons-vue";
</script>
<script>
import SecondaryButton from "../components/SecondaryButton.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "OrderDetails",
  components: {SecondaryButton},
  props: ["couponCode", "order"],
  computed: {
    hotelName() {
      return this.hotels.find(hotel=> hotel.id === this.currentHotel.id).hotel_name
    },
    hotelCity() {
      return this.currentHotel.city
    },
    roomName() {
      return this.currentHotel.room_type.find(room_type => room_type.id === this.order.selectedRoomType).title
    },
    scenicName() {
      return this.currentHotel.room_scenic.find(room_scenic => room_scenic.id === this.order.selectedRoomScenic).title
    },
    roomPrice() {
      return this.currentHotel.room_type.find(room_type => room_type.id === this.order.selectedRoomType).price
    },
    scenicPrice() {
      return this.currentHotel.room_scenic.find(room_scenic => room_scenic.id === this.order.selectedRoomScenic).price_rate
    },
    roomTotal() {
      return this.order.selectedDayCount * (this.order.selectedAdultSize + this.order.selectedChildSize) * this.roomPrice
    },
    totalPrice() {
      let discount = this.order.discount?this.order.discount.discount_ammount:0
      this.order.totalPrice = this.roomTotal + this.roomTotal*this.scenicPrice/100-discount
      return this.order.totalPrice
    },
    ...mapState({
      hotels: state => state.hotels,
      currentHotel: state => state.currentHotel,
    })
  },
  methods: {
    useDiscountCode() {
      this.applyCode(this.order.discountCode).then(res=> {
        if(res) {
          this.$notify({
            title: 'Hata',
            message: res,
            type: 'error',
          })
        }
        else {
          this.$notify({
            title: 'Başarılı',
            message: 'İndiriminiz başarılı bir şekilde uygulandı',
            type: 'success',
          })
        }
      })
    },
    ...mapActions(
        ["applyCode", "removeDiscount"]
    )
  }
}
</script>

<style scoped>

</style>