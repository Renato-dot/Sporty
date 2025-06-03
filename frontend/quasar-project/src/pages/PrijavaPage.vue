<template>
  <q-page class="q-pa-md">
    <q-form @submit.prevent="login">
      <q-input v-model="username" label="Korisničko ime" />
      <q-input v-model="password" label="Lozinka" type="password" />
      <q-btn label="Prijava" type="submit" color="primary" />
    </q-form>
  </q-page>
</template>

<script>
import { api } from "boot/axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post("/admin", {
          username: this.username,
          password: this.password,
        });

        if (response.data.success) {
          this.$router.push("/admin"); // ili kamo već ide admin
        } else {
          this.$q.notify({ color: "negative", message: "Krivi podaci" });
        }
      } catch (err) {
        console.error(err);
        this.$q.notify({ color: "negative", message: "Greška pri prijavi" });
      }
    },
  },
};
</script>
