<template>
  <q-page padding>
    <h1>Registracija</h1>
    <p>Ispunite donja polja za registraciju.</p>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        v-model="ime"
        label="Vaše ime *"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Unesite Vaše ime']"
      />

      <q-input
        v-model="prezime"
        label="Vaše prezime *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Unesite Vaše prezime',
        ]"
      />
      <q-input
        v-model="broj"
        label="Vaš broj telefona *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Unesite Vaš broj telefona',
        ]"
      />
      <q-input
        v-model="email"
        label="Vaš email *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Unesite Vaš email',
          (val) =>
            /\S+@\S+\.\S+/.test(val) || 'Unesite valjani email koji sadrži @',
        ]"
      />

      <div>
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
          @click="insertFields()"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  setup() {
    const ime = ref(null);
    const prezime = ref(null);
    const broj = ref(null);
    const email = ref(null);

    return {
      ime,
      prezime,
      broj,
      email,
    };
  },
  methods: {
    async insertFields() {
      const formData = {
        ime_korisnika: this.ime,
        prezime_korisnika: this.prezime,
        broj_telefona_korisnika: this.broj,
        email_korisnika: this.email,
      };
      await axios
        .post("http://localhost:3000/api/korisnici", formData)
        .then((result) => {
          console.log(result.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
