<template>
  <div class="wrapper">
    <header class="d-flex justify-space-between align-center pl-3 pr-2">
      <div class="d-flex justify-space-between align-center">
        <time
          :datetime="navigationDate"
          class="text-body-1 font-weight-bold mr-1"
          >{{ dateLabel }}</time
        >
        <nav>
          <v-btn icon x-small>
            <v-icon aria-label="Next" role="button" aria-hidden="false">
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </nav>
      </div>
      <nav>
        <v-btn icon x-small @click="goToPrevMonth">
          <v-icon aria-label="Previous Month" role="button" aria-hidden="false">
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn icon x-small @click="goToNextMonth">
          <v-icon aria-label="Next Month" role="button" aria-hidden="false">
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </nav>
    </header>
    <v-date-picker
      :value="resolvedDate"
      @change="onSelectDate"
      :allowed-dates="getAllowedDates"
      :events="getReservedDates"
      color="#333333"
      event-color="#848484"
      :first-day-of-week="1"
      full-width
      :weekday-format="formatWeekDay"
      :show-current="false"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { NormalizedDate, normalizeDate } from "./calendarUtils";
import { DAYS_OF_WEEK } from "./calendarConstant";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    initialDate: {
      type: String,
      required: true,
    },
    onChangeDate: {
      type: Function as PropType<(newDate: string) => void>,
    },
    blockedDates: {
      type: Array as PropType<string[]>,
    },
    reservedDates: {
      type: Array as PropType<string[]>,
    },
  },
  data: () => ({
    navigationDate: "",
    selectedDate: "",
  }),
  computed: {
    dateLabel: function () {
      const date = new Date(this.navigationDate);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();

      return `${month} ${year}`;
    },
    resolvedDate: function () {
      const [navYear, navMonth] = this.navigationDate.split("-");
      const [selectedYear, selectedMonth] = this.selectedDate.split("-");

      const isSameYearAndMonth =
        navYear === selectedYear && navMonth === selectedMonth;

      if (isSameYearAndMonth) {
        return this.selectedDate;
      } else {
        return this.navigationDate;
      }
    },
    normalizedBlockedDates(): NormalizedDate | null {
      if (!this.blockedDates) return null;

      return normalizeDate(this.blockedDates);
    },
    normalizedReservedDates(): NormalizedDate | null {
      if (!this.reservedDates) return null;

      return normalizeDate(this.reservedDates);
    },
  },
  methods: {
    getAllowedDates(date: string) {
      const [year, month, day] = date.split("-");
      if (this.normalizedBlockedDates === null) return true;

      if (
        this.normalizedBlockedDates[year] &&
        this.normalizedBlockedDates[year][month]
      ) {
        return !this.normalizedBlockedDates[year][month].includes(day);
      } else {
        return true;
      }
    },
    getReservedDates(date: string) {
      const [year, month, day] = date.split("-");
      if (this.normalizedReservedDates === null) return false;

      if (
        this.normalizedReservedDates[year] &&
        this.normalizedReservedDates[year][month]
      ) {
        return this.normalizedReservedDates[year][month].includes(day);
      } else {
        return false;
      }
    },
    formatWeekDay: function (givenDate: string) {
      const date = new Date(givenDate);
      return DAYS_OF_WEEK[date.getDay()];
    },
    goToPrevMonth: function () {
      const date = new Date(this.navigationDate);
      date.setMonth(date.getMonth() - 1);
      const [year, month] = date.toISOString().split("-");

      this.navigationDate = `${year}-${month}`;
    },
    goToNextMonth: function () {
      const date = new Date(this.navigationDate);
      date.setMonth(date.getMonth() + 1);
      const [year, month] = date.toISOString().split("-");

      this.navigationDate = `${year}-${month}`;
    },
    onSelectDate: function (val: string) {
      this.selectedDate = val;

      if (this.onChangeDate) {
        this.onChangeDate(val);
      }
    },
  },
  watch: {
    initialDate: {
      immediate: true,
      handler(newVal) {
        this.navigationDate = newVal;
        this.selectedDate = newVal;
      },
    },
  },
});
</script>

<style scoped>
::v-deep .v-picker__title {
  display: none;
}

::v-deep .v-date-picker-header {
  display: none;
}

::v-deep .v-picker.v-card {
  background: transparent;
}

::v-deep .v-date-picker-table {
  padding: 0;
  height: min-content;
}

::v-deep th {
  color: #19181a !important;
  font-weight: 600 !important;
}

::v-deep .v-picker__body {
  width: 100% !important;
  background: transparent !important;
}

::v-deep .v-date-picker-table table {
  border-collapse: collapse;
}

::v-deep .v-date-picker-table tbody tr:not(:last-child) td {
  border-bottom: 1px solid #dadada;
}

::v-deep .v-date-picker-table th {
  width: 48px;
}

::v-deep .v-date-picker-table tbody td {
  height: 48px;
}

::v-deep .v-date-picker-table .v-btn {
  position: relative;
  top: -6px;
}

::v-deep .theme--light.v-btn--active::before {
  opacity: 0 !important;
}

::v-deep .v-date-picker-table .v-btn--disabled::before {
  content: "";
  position: absolute;
  height: 48px;
  width: 48px;
  background: #eaeaea;
  opacity: 1;
  border-radius: 0;
  top: -2px;
  left: -6px;
  right: initial;
  bottom: initial;
}

::v-deep .v-date-picker-table .v-btn--disabled::after {
  content: "";
  height: 2px;
  background: #c1c1c1;
  position: absolute;
  width: 62px;
  top: 21px;
  transform: rotate(135deg);
}

::v-deep .v-date-picker-table__events {
  bottom: -3px !important;
}

::v-deep .v-date-picker-table__events div {
  width: 5px;
  height: 5px;
}
</style>
