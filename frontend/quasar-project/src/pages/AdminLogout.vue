<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <center>
        <h2>Želite li se stvarno odjaviti iz admin sučelja?</h2>
        <q-btn color="negative" label="Logout" @click="logout" />
      </center>
    </div>
  </q-page>
</template>

<script>
import { api } from "boot/axios";

export default {
  methods: {
    async logout() {
      try {
        const response = await api.post("/logout");
        if (response.status === 200) {
          this.$router.push("/");
        } else {
          this.$q.notify({ type: "negative", message: "Greška pri odjavi" });
        }
      } catch (err) {
        console.error(err);
        this.$q.notify({ type: "negative", message: "Greška pri odjavi" });
      }
    },
  },
};
</script>
