<template>
  <v-app>
    <v-main>
      <Calendar
        :initialDate="mockData.calendar.initialDate"
        :blockedDates="mockData.calendar.blockedDates"
        :reservedDates="mockData.calendar.reservedDates"
        :onChangeDate="onChangeDate"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Calendar } from "@/components";

export default Vue.extend({
  name: "App",
  components: {
    Calendar,
  },
  data: () => ({
    mockData: {
      calendar: {
        initialDate: "2022-04-02",
        blockedDates: [
          "2022-04-04",
          "2022-04-05",
          "2022-04-06",
          "2022-04-30",
          "2022-05-01",
          "2022-05-02",
          "2022-05-03",
        ],
        reservedDates: ["2022-04-07", "2022-04-15", "2022-05-08"],
      },
    },
  }),
  methods: {
    onChangeDate(newDate: string) {
      window.alert(`New date: ${newDate}`);
    },
  },
});
</script>
