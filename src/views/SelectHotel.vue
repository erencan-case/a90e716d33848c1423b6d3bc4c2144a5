<template>
  <div class="select-hotel">
    <div class="select-hotel-container">
      <div class="select-hotel-form">
        <el-card class="w-96">
          <div>
            <div class="my-4">
              <img src="../assets/images/marginalia-location-access.png" alt="Select Hotel">
              <div class="font-bold mb-2">Otel Seçiniz</div>
              <el-select size="large" filterable clearable v-model="order.selectedHotel" @change="selectHotel">
                <el-option
                    v-for="item in hotels"
                    :key="item.id"
                    :label="item.hotel_name"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </div>

            <div v-if="order.selectedHotel" class="my-4">
              <div class="mb-2"><b>Giriş ve Çıkış Tarihi Seçiniz</b></div>
              <el-date-picker
                  v-model="order.selectedDates"
                  type="daterange"
                  range-separator="ile"
                  start-placeholder="Giriş Tarihi"
                  end-placeholder="Çıkış Tarihi"
                  orderat="DD.MM.YYYY"
                  size="large"
                  format="DD.MM.YYYY"
              >
              </el-date-picker>
              <div class="text-xs py-4 flex gap-2" v-if="order.selectedDates">
                <Check width="16" height="16"></Check>
                <b>{{ dayCount }} Gece</b> Seçildi
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div v-if="currentHotel && order.selectedDates">
              <div class="font-bold mb-2">Yetişkin Sayısı</div>
              <div>
                <el-input-number :min="0"
                                 :max="currentHotel.max_adult_size?currentHotel.max_adult_size:5"
                                 v-model="order.selectedAdultSize"></el-input-number>
              </div>
            </div>
            <div v-if="currentHotel && order.selectedDates">
              <div class="font-bold mb-2">Çocuk Sayısı</div>
              <div>
                <el-input-number :disabled="!currentHotel.child_status" :min="0" :max="5"
                                 v-model="order.selectedChildSize"></el-input-number>
              </div>
            </div>


          </div>
          <div v-if="order.selectedHotel && currentHotel && !currentHotel.child_status" class="mt-4">
            <el-alert :closable="false" type="error">Bu otel çocuk kabul etmiyor</el-alert>
          </div>

        </el-card>
      </div>
      <div
          class="select-hotel-footer">
        <primary-button :disabled="!order.selectedHotel || !order.selectedDates || !order.selectedDayCount>0"
                        @click="saveHotel(order)">Kaydet ve Devam
          Et
        </primary-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PrimaryButton from "../components/PrimaryButton.vue";
import VuePaycard from "../components/VuePaycard.vue";
import {Check} from "@element-plus/icons-vue";

export default {
  name: "SelectHotel",
  components: {Check, VuePaycard, PrimaryButton},
  mounted() {
    this.getHotels()
  },
  computed: {
    dayCount() {
      let date1 = new Date(this.order.selectedDates[0]);
      let date2 = new Date(this.order.selectedDates[1]);
      let diffTime = Math.abs(date2 - date1);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.order.selectedDayCount = diffDays
      return diffDays
    },
    ...mapState({
      hotels: state => state.hotels,
      currentHotel: state => state.currentHotel,
      order: state => state.order,
    })
  },
  methods: {
    ...mapActions(
        ["getHotels", "selectHotel", "saveHotel"]
    )
  }
}
</script>

<style lang="scss" scoped>
.select-hotel {
  &-container {
    @apply container m-auto;

  }
  &-form {
    @apply flex justify-center;
  }
  &-footer {
    @apply flex rounded-2xl justify-end my-4 p-8 border border-slate-300 bg-slate-200 shadow-slate-500/20 shadow-2xl;
  }
}
</style>
