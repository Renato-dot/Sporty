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

        <q-toolbar-title class="text-weight-bolder, text-h4">
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

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
  {
    title: "Admin",
    caption: "Admin",
    icon: "login",
    link: "#/admin",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
