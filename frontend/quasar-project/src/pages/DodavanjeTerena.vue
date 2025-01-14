<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">
      <center>
        <h3>Unos terena</h3>
        <p>Unesite željeni teren</p>
      </center>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          v-model="Naziv"
          label="Naziv terena *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Unesi naziv terena',
          ]"
        />

        <q-input
          filled
          v-model="Lokacija"
          label="Lokacija *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Unesi lokaciju terena',
          ]"
        />
        <q-input
          filled
          v-model="Radno_vrijeme"
          label="Radno vrijeme terena *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Unesi radno vrijeme',
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
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const Naziv = ref(null);
    const Lokacija = ref(null);
    const Radno_vrijeme = ref(null);

    return {
      Naziv,
      Lokacija,
      Radno_vrijeme,
    };
  },
  methods: {
    async insertFields() {
      const formData = {
        Naziv: this.Naziv,
        Lokacija: this.Lokacija,
        Radno_vrijeme: this.Radno_vrijeme,
      };
      await axios
        .post("http://localhost:3000/api/tereniAdd", formData)
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
