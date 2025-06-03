<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-weight-bolder text-h4">
          Sporty
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Korisni linkovi </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <!-- Dark mode toggle ispod linkova -->
      <q-separator spaced />
      <div class="q-pa-md">
        <q-toggle
          v-model="isDark"
          label="Dark Mode"
          color="primary"
          left-label
          :icon="isDark ? 'dark_mode' : 'light_mode'"
          @update:model-value="toggleDarkMode"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { Dark } from "quasar";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const isDark = ref(Dark.isActive);

const toggleDarkMode = () => {
  Dark.set(isDark.value);
};

const linksList = [
  {
    title: "Naslovnica",
    caption: "Početna stranica",
    icon: "home",
    link: "#",
  },
  {
    title: "Oprema",
    caption: "Dostupna oprema",
    icon: "list",
    link: "#/Oprema",
  },
  {
    title: "Tereni",
    caption: "Pregledajte terene",
    icon: "list",
    link: "#/Tereni",
  },
  {
    title: "Pretrazivanje",
    caption: "",
    icon: "search",
    link: "#/Pretrazivanje",
  },
  {
    title: "Lokacija",
    caption: "Lokacije",
    icon: "map",
    link: "#/Lokacije",
  },
  {
    title: "Pregled rezervacija",
    caption: "Pregled rezervacija",
    icon: "list",
    link: "#/Rezervacije",
  },
  {
    title: "Registracija",
    caption: "Registracija",
    icon: "man",
    link: "#/Registracija",
  },
  {
    title: "Prijava (admin)",
    caption: "Prijava",
    icon: "login",
    link: "#/Prijava",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
