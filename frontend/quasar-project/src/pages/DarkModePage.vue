<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Sporty</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" bordered>
      <q-list padding>

        <!-- Tvoji linkovi -->
        <q-item clickable to="/">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Naslovnica</q-item-section>
        </q-item>

        <!-- Ostali linkovi... -->

        <q-item clickable to="/login">
          <q-item-section avatar><q-icon name="login" /></q-item-section>
          <q-item-section>Prijava (admin)</q-item-section>
        </q-item>

        <!-- DARK MODE TOGGLE -->
        <q-item>
          <q-item-section avatar>
            <q-icon :name="isDark ? 'dark_mode' : 'light_mode'" />
          </q-item-section>
          <q-item-section>
            <q-toggle v-model="isDark" label="Dark Mode" @update:model-value="toggleDarkMode" />
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { Dark } from 'quasar'

const isDark = ref(Dark.isActive)

const toggleDarkMode = () => {
  Dark.set(isDark.value)
}
</script>
