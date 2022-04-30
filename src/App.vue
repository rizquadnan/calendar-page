<template>
  <v-app>
    <div class="app">
      <div class="hero">
        <div class="app-wrapper">
          <header
            class="d-flex justify-space-between align-center mb-2 pl-4 pr-3"
          >
            <h1 class="text-h5 font-weight-bold">Calendar</h1>
            <v-btn icon>
              <v-icon aria-label="Next Month" role="button" aria-hidden="false">
                mdi-cog-outline
              </v-icon>
            </v-btn>
          </header>
          <div class="calendar-wrapper">
            <Calendar
              :initialDate="calendar.initialDate"
              :blockedDates="calendar.blockedDates"
              :reservedDates="calendar.reservedDates"
              :onChangeDate="onChangeDate"
            />
          </div>
        </div>
      </div>
      <div class="app-wrapper">
        <OrderList />
      </div>
      <AppFooter />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Calendar } from "@/components";
import OrderList from "./components/OrderList/OrderList.vue";
import AppFooter from "./components/AppFooter/AppFooter.vue";
import { fetcher } from "./shared";

export default Vue.extend({
  name: "App",
  components: {
    Calendar,
    OrderList,
    AppFooter,
  },
  data: () => ({
    calendar: {
      initialDate: "",
      blockedDates: [],
      reservedDates: [],
    },
  }),
  methods: {
    onChangeDate(newDate: string) {
      this.$store.commit("saveSelectedDate", newDate);
    },
    loadInitialDateFromStore() {
      const cachedSelectedDate = this.$store.state.selectedDate;

      if (cachedSelectedDate) {
        this.calendar.initialDate = cachedSelectedDate;
      }
    },
  },
  async mounted() {
    this.loadInitialDateFromStore();

    try {
      const [{ data: reservedDates }, { data: blockedDates }] =
        await Promise.all([
          fetcher.get("/reserved_dates"),
          fetcher.get("/blocked_dates"),
        ]);

      this.calendar.reservedDates = reservedDates;
      this.calendar.blockedDates = blockedDates;
    } catch (error) {
      console.error(error);
    }
  },
});
</script>

<style scoped>
.app {
  min-height: 100vh;
}
.app-wrapper {
  max-width: 375px;
  margin: 0 auto;
}

.hero {
  background: #f4f4f4;
  padding-top: 48px;
}
.calendar-wrapper {
  max-width: 327px;
  min-height: 346px;
  margin: 0 auto;
}
</style>
