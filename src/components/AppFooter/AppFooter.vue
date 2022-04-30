<template>
  <footer class="footer px-4 py-3">
    <nav>
      <ul class="d-flex nav-list">
        <li>
          <v-btn plain class="button">
            <v-icon aria-hidden="false"> mdi-home-outline </v-icon>
            <span class="button-caption mt-1">Home</span>
          </v-btn>
        </li>
        <li>
          <v-btn text class="button">
            <v-icon aria-hidden="false"> mdi-calendar-outline </v-icon>
            <span class="button-caption mt-1">Calendar</span>
          </v-btn>
        </li>
        <li>
          <v-badge color="red" content="1">
            <v-btn plain class="button">
              <v-icon aria-hidden="false"> mdi-briefcase-outline </v-icon>
              <span class="button-caption mt-1">Request</span>
            </v-btn></v-badge
          >
        </li>
        <li>
          <v-btn plain class="button">
            <v-icon aria-hidden="false"> mdi-account-multiple-outline </v-icon>
            <span class="button-caption mt-1">Client</span>
          </v-btn>
        </li>
        <li>
          <v-btn plain class="button">
            <v-icon aria-hidden="false"> mdi-account-outline </v-icon>
            <span class="button-caption mt-1">Menu</span>
          </v-btn>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

ul {
  list-style-type: none;
  padding: 0;
}

::v-deep .v-btn__content {
  display: flex;
  flex-direction: column;
  padding: 2px;
}

::v-deep .v-badge__badge {
  inset: auto auto calc(100% - 4px) calc(100% - 20px) !important;
  width: 15px !important;
  height: 15px !important;
  min-width: none !important;
  min-height: none;
  font-size: 8px;
}

.button {
  width: 64px;
  flex: 1;
  min-width: 44px !important;
}
.button-caption {
  display: inline-block;
  font-size: 10px;
  text-transform: initial;
}
</style>
