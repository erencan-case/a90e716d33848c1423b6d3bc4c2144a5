<template>
  <div class="bg-white py-4 px-8 border">
    <h1 class="font-bold text-3xl mb-4">{{ hotelName }}</h1>
    <div class="flex justify-between">
      <div><b>Giriş Tarihi:</b> {{
          new Intl.DateTimeFormat('en-EN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            weekday: 'long'
          }).format(order.selectedDates[0])
        }}
      </div>
      <div><b>Çıkış Tarihi:</b> {{
          new Intl.DateTimeFormat('en-EN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            weekday: 'long'
          }).format(order.selectedDates[1])
        }}
      </div>
      <div><b>Yetişkin Sayısı:</b> {{ order.selectedAdultSize }}</div>
      <div><b>Çocuk Sayısı:</b> {{ order.selectedChildSize }}</div>
    </div>
  </div>
  <div class="container m-auto">
    <div class="font-bold p-4 text-center">Oda Tipi Seçimi</div>
    <div class="flex justify-around flex-wrap gap-4">
      <div v-for="room_type in currentHotel.room_type">
        <el-card @click="form.selectedRoomType=room_type.id" :class="{'outline': form.selectedRoomType === room_type.id}" class="w-96 outline-4 outline-slate-500 cursor-pointer text-left hover:ring-2">
          <img
              :src="room_type.photo"
              class="rounded" :alt="room_type.title"
          />
          <div class="flex justify-between py-2">
            <div class="font-bold">{{ room_type.title }}</div>
            <div>
              {{ room_type.price }} TL
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <hr class="divide-x my-8"/>
    <div class="font-bold p-4 text-center">Manzara Seçimi</div>
    <div class="flex justify-around flex-wrap gap-4">
      <div v-for="room_scenic in currentHotel.room_scenic">
        <el-card @click="form.selectedRoomScenic=room_scenic.id" :class="{'outline': form.selectedRoomScenic === room_scenic.id}" class="w-96 outline-4 outline-slate-500 cursor-pointer text-left hover:ring-2">
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
        class="flex rounded-2xl justify-between my-4 p-8 border border-slate-300 bg-slate-200 shadow-slate-500/20 shadow-2xl ">
      <secondary-button @click="setStep('SelectHotel')">Geri Dön</secondary-button>
      <primary-button :disabled="!form.selectedRoomType || !form.selectedRoomScenic" @click="saveScene(form)">Kaydet ve Devam Et</primary-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PrimaryButton from "../components/PrimaryButton.vue";
import SecondaryButton from "../components/SecondaryButton.vue";

export default {
  name: "SelectScene",
  data() {
    return {
      form: {}
    }
  },
  components: {SecondaryButton, PrimaryButton},
  computed: {
    hotelName() {
      return this.hotels.find(hotel => hotel.id === this.currentHotel.id).hotel_name
    },
    ...mapState({
      hotels: state => state.hotels,
      order: state => state.order,
      currentHotel: state => state.currentHotel,
    })
  },
  methods: {
    ...mapActions(
        ["setStep", "saveScene"]
    )
  }
}
</script>

<style scoped>

</style>