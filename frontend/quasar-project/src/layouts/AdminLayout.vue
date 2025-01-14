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

        <q-toolbar-title class="text-h2">
          <strong>Admin</strong> Sporty
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
import { computed, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "AdminLayout",
});

let title = computed(() => {
  return "Sporty (admin)";
});

const linksList = [
  {
    title: "Admin početna",
    caption: "Admin početna",
    icon: "home",
    link: "#/admin",
  },
  {
    title: "Oprema",
    caption: "Oprema",
    icon: "chat",
    link: "#/admin/opremaAPI",
  },
  {
    title: "Tereni",
    caption: "Tereni",
    icon: "chat",
    link: "#/admin/tereniAPI",
  },
  {
    title: "Dodavanje terena",
    caption: "Dodavanje terena",
    icon: "chat",
    link: "#/admin/dodavanje_terena",
  },
  {
    title: "Logout",
    caption: "Logout",
    icon: "chat",
    link: "#/admin/logout",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
