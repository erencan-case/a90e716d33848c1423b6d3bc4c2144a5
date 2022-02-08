<template>
  <div class="select-scene">
    <div class="select-scene-header">
      <div class="container m-auto p-4">
        <h1 class="font-bold text-3xl mb-4">{{ hotelName }}</h1>
        <div class="flex flex-col sm:flex-row justify-between">
          <div><b>Giriş Tarihi:</b> {{
              new Intl.DateTimeFormat('tr-TR', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                weekday: 'long'
              }).format(new Date(order.selectedDates[0]))
            }}
          </div>
          <div><b>Çıkış Tarihi:</b> {{
              new Intl.DateTimeFormat('tr-TR', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                weekday: 'long'
              }).format(new Date(order.selectedDates[1]))
            }}
          </div>
          <div><b>Yetişkin Sayısı:</b> {{ order.selectedAdultSize }}</div>
          <div><b>Çocuk Sayısı:</b> {{ order.selectedChildSize }}</div>
        </div>
      </div>
    </div>
    <div class="container m-auto">
      <div class="select-scene-step">1) Oda Tipi Seçimi</div>
      <div class="select-scene-card-container">
        <div v-for="room_type in currentHotel.room_type">
          <el-card @click="order.selectedRoomType=room_type.id"
                   :class="{'outline': order.selectedRoomType === room_type.id}"
                   class="select-scene-card">
            <img
                :src="room_type.photo"
                class="rounded" :alt="room_type.title"
            />
            <div class="flex justify-between py-2">
              <div>
                <div class="font-bold">{{ room_type.title }}</div>
                <div>{{ order.selectedDayCount }} Gün</div>
                <div>{{ order.selectedAdultSize }} Yetişkin</div>
                <div v-if="order.selectedChildSize">{{ order.selectedChildSize }} Çocuk</div>
              </div>
              <div>
                {{ roomPrice(room_type) }} TL
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <hr class="divide-x my-8"/>
      <div class="select-scene-step">2) Manzara Seçimi</div>
      <div class="select-scene-card-container">
        <div v-for="room_scenic in currentHotel.room_scenic">
          <el-card @click="order.selectedRoomScenic=room_scenic.id"
                   :class="{'outline': order.selectedRoomScenic === room_scenic.id}"
                   class="select-scene-card">
            <img
                :src="room_scenic.photo"
                class="rounded"
                :alt="room_scenic.title"
            />
            <div class="flex justify-between py-2">
              <div class="font-bold">{{ room_scenic.title }}</div>
              <div>
                +%{{ room_scenic.price_rate }}
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div
          class="select-scene-footer">
        <secondary-button @click="setStep('SelectHotel')">Geri Dön</secondary-button>
        <primary-button :disabled="!order.selectedRoomType || !order.selectedRoomScenic" @click="saveScene(order)">
          Kaydet ve Devam Et
        </primary-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PrimaryButton from "../components/PrimaryButton.vue";
import SecondaryButton from "../components/SecondaryButton.vue";

export default {
  name: "SelectScene",
  components: {SecondaryButton, PrimaryButton},
  computed: {
    hotelName() {
      return this.hotels.find(hotel => hotel.id === this.currentHotel.id).hotel_name
    },
    totalGuest() {
      return this.order.selectedAdultSize + this.order.selectedChildSize
    },
    ...mapState({
      hotels: state => state.hotels,
      order: state => state.order,
      currentHotel: state => state.currentHotel,
    })
  },
  methods: {
    roomPrice(room) {
      return room.price * this.totalGuest * this.order.selectedDayCount
    },
    ...mapActions(
        ["setStep", "saveScene"]
    )
  }
}
</script>

<style lang="scss" scoped>
.select-scene {
  &-header {
    @apply bg-white py-4 px-8 border;
  }
  &-step {
    @apply font-bold text-2xl p-4 text-left;
  }
  &-card-container {
    @apply flex justify-around flex-wrap gap-4;
  }
  &-card {
    @apply w-96 outline-4 outline-slate-500 cursor-pointer text-left hover:ring-2;
  }
  &-footer {
    @apply flex rounded-2xl justify-between my-4 p-8 border border-slate-300 bg-slate-200 shadow-slate-500/20 shadow-2xl;
  }
}
</style>