<template>
  <q-page padding class="login-page">
    <!-- Naslov i popratni tekst -->
    <div class="text-center q-mb-md">
      <h1>Login</h1>
      <p>Unesite svoje korisničko ime i lozinku za pristup knjižnici.</p>
    </div>

    <!-- Forma za prijavu -->
    <q-form class="q-gutter-md" @submit.prevent="onSubmit">
      <q-input
        filled
        label="Korisničko ime"
        v-model="username"
        required
      />
      <q-input
        filled
        label="Lozinka"
        type="password"
        v-model="password"
        required
      />
      <q-btn label="Potvrdi" type="submit" color="primary" />
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const username = ref('');
    const password = ref('');

    const onSubmit = () => {
      // Ovdje ide logika za provjeru podataka za prijavu
      console.log("Korisničko ime:", username.value, "Lozinka:", password.value);
    };

    return {
      username,
      password,
      onSubmit
    };
  }
};
</script>
