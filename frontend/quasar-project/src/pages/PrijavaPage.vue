<template>
  <q-page padding class="login-page">
    <div class="text-center q-mb-md">
      <h1>Login</h1>
      <p>Unesite svoje korisničko ime i lozinku za pristup admin sučelju.</p>
    </div>

    <q-form class="q-gutter-md" @submit.prevent="onSubmit">
      <q-input filled label="Korisničko ime" v-model="username" required />
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
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const onSubmit = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/admin", {
          username: username.value,
          password: password.value,
        });

        if (response.data.success) {
          console.log("Login successful:", response.data);
          // Redirect to the admin page after successful login
          router.push("/admin");
        } else {
          console.error("Invalid login:", response.data.message);
          alert("Invalid username or password");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
      }
    };

    return {
      username,
      password,
      onSubmit,
    };
  },
};
</script>
