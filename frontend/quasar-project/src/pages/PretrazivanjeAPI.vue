<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-input
        v-model="searchQuery"
        label="Unesite naziv ili lokaciju terena"
        outlined
        clearable
      />

      <div class="q-my-md">
        <q-checkbox v-model="searchByIme" label="Pretraži po imenu terena" />
        <q-checkbox v-model="searchByLokacija" label="Pretraži po lokaciji terena" />
      </div>

      <q-btn label="Traži" color="primary" @click="performSearch" />

      <q-table
        v-if="filteredTereni.length"
        :rows="filteredTereni"
        :columns="columns"
        row-key="id"
        title="Rezultati Pretraživanja"
        class="q-mt-md"
      />
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const searchQuery = ref('');
    const searchByIme = ref(true);
    const searchByLokacija = ref(false);

    const columns = [
      { name: 'Naziv', label: 'Naslov', align: 'left', field: 'Naziv' },
      { name: 'Lokacija', label: 'Lokacija', align: 'left', field: 'Lokacija' },
      { name: 'Radno_vrijeme', label: 'Radno vrijeme', align: 'center', field: 'Radno_vrijeme' }
    ];

    const filteredTereni = ref([]);

    const performSearch = async () => {
      if (!searchQuery.value) {
        filteredTereni.value = [];
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/tereniSearch', {
          params: {
            query: searchQuery.value,
            searchByIme: searchByIme.value,
            searchByLokacija: searchByLokacija.value
          }
        });
        filteredTereni.value = response.data;
      } catch (error) {
        console.error('Error fetching tereni:', error);
        filteredTereni.value = [];
      }
    };

    return {
      searchQuery,
      searchByIme,
      searchByLokacija,
      columns,
      filteredTereni,
      performSearch
    };
  }
};
</script>
