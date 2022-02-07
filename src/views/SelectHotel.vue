<template>
  <div class="container m-auto">
    <div class="flex justify-center">
      <el-card class="w-96">
        <div>
          <div class="my-4">
            <div class="font-bold mb-2">Otel Seçiniz</div>
            <el-select size="large" clearable v-model="form.selectedHotel" @change="selectHotel">
              <el-option
                  v-for="item in hotels"
                  :key="item.id"
                  :label="item.hotel_name"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </div>

          <div v-if="form.selectedHotel" class="my-4">
            <div class="font-bold mb-2">Giriş ve Çıkış Tarihi Seçiniz</div>
            <el-date-picker
                            v-model="form.selectedDates"
                            type="daterange"
                            range-separator="ile"
                            start-placeholder="Giriş Tarihi"
                            end-placeholder="Çıkış Tarihi"
                            format="DD.MM.YYYY"
                            size="large"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="flex justify-between">
          <div v-if="currentHotel && form.selectedDates">
            <div class="font-bold mb-2">Yetişkin Sayısı</div>
            <div>
              <el-input-number  :min="0"
                               :max="currentHotel.max_adult_size?currentHotel.max_adult_size:5"
                               v-model="form.selectedAdultSize"></el-input-number>
            </div>
          </div>
          <div v-if="currentHotel && form.selectedDates">
            <div class="font-bold mb-2">Çocuk Sayısı</div>
            <div>
              <el-input-number :disabled="!currentHotel.child_status" :min="0" :max="5"
                               v-model="form.selectedChildSize"></el-input-number>
            </div>
          </div>


        </div>
        <div v-if="form.selectedHotel && currentHotel && !currentHotel.child_status" class="mt-4">
          <el-alert :closable="false" type="error">Bu otel çocuk kabul etmiyor</el-alert>
        </div>

      </el-card>
    </div>
    <div
        class="flex rounded-2xl justify-end my-4 p-8 border border-slate-300 bg-slate-200 shadow-slate-500/20 shadow-2xl ">
      <primary-button :disabled="!form.selectedHotel || !form.selectedDates" @click="saveHotel(form)">Kaydet ve Devam
        Et
      </primary-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PrimaryButton from "../components/PrimaryButton.vue";
import VuePaycard from "../components/VuePaycard.vue";

export default {
  name: "SelectHotel",
  components: {VuePaycard, PrimaryButton},
  data() {
    return {
      form: {
        selectedAdultSize: 2,
        selectedChildSize: 0
      }
    }
  },
  mounted() {
    this.getHotels()
  },
  computed: {
    ...mapState({
      hotels: state => state.hotels,
      currentHotel: state => state.currentHotel,
    })
  },
  methods: {
    ...mapActions(
        ["getHotels", "selectHotel", "saveHotel"]
    )
  }
}
</script>

<style scoped>

</style>
