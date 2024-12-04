<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-input
        v-model="searchQuery"
        label="Unesite naziv opreme ili terena"
        outlined
        clearable
      />

      <div class="q-my-md">
        <q-checkbox v-model="searchByTitle" label="Pretraži po imenu predmeta" />
        <q-checkbox v-model="searchByOpis" label="Pretraži po opisu predmeta" />
        <q-checkbox v-model="searchByIme" label="Pretraži po imenu terena" />
        <q-checkbox v-model="searchByLokacija" label="Pretraži po lokaciji terena" />
      </div>

      <q-btn label="Traži" color="primary" @click="performSearch" />

      <q-table
        v-if="filteredOprema.length"
        :rows="filteredOprema"
        :columns="columns"
        row-key="id"
        title="Rezultati Pretraživanja"
        class="q-mt-md"
      />
      <q-table
        v-if="filteredTereni.length"
        :rows="filteredTereni"
        :columnst="columnst"
        row-key="id"
        title="Rezultati Pretraživanja"
        class="q-mt-md"
      />
    </div>
  </q-page>
  
</template>


<script>
import { ref } from 'vue';

export default {
  setup() {
    const searchQuery = ref('');
    const searchByTitle = ref(true);
    const searchByOpis = ref(false);
    const searchByIme = ref(true);
    const searchByLokacija = ref(false);

    const columns = [
      { name: 'id', label: 'ID', align: 'left', field: row => row.id },
      { name: 'naslov', label: 'Naslov', align: 'left', field: row => row.naslov },
      { name: 'opis', label: 'Opis', align: 'left', field: row => row.opis },
      { name: 'stanje', label: 'Stanje', align: 'right', field: row => row.stanje }
    ];

    const oprema = [
        { id: 1, naslov: 'Nogometni dres', opis: 'Dres za igranje nogometa.', stanje: 14 },
        { id: 2, naslov: 'Lopta za nogomet', opis: 'Lopta za profesionalce.', stanje: 86 },
        { id: 3, naslov: 'Dres za košarku', opis: 'Igrajte košarku kao profesionalac', stanje: 35 },
        { id: 4, naslov: 'Lopta za košarku', opis: 'Igrajte košarku kao Michael Jordan.', stanje: 32 },
        { id: 5, naslov: 'Reket za tenis', opis: 'Profesionalni reket.', stanje: 79 }
      ]
    const columnst = [
      { name: 'id', label: 'ID', align: 'left', field: 'id' },
      { name: 'naslov', label: 'Naslov', align: 'left', field: 'naslov' },
      { name: 'lokacija', label: 'Lokacija', align: 'left', field: 'lokacija' },
      { name: 'slika', label: 'Slika', align: 'center', field: 'slika', format: val => '' }, // Bez prikaza slike
      { name: 'radno_vrijeme', label: 'Radno vrijeme', align: 'center', field: 'radno_vrijeme' }
    ];

    const tereni = [
        { id: 1, naslov: 'HNK Rijeka Stadium Rujevica', lokacija: 'Rujevica 10, 51000, Rijeka', radno_vrijeme: 'Svaki dan, 8 AM - 8 PM' },
        { id: 2, naslov: 'Muški rukometaški klub "Kozala"', lokacija: 'Kozala 37, 51000, Rijeka', radno_vrijeme: 'Ponedjeljka do Petka, 6 PM - 10:30 PM' },
        { id: 3, naslov: 'Košarkaški klub "KVARNER 2010"', lokacija: 'Ul. Slaviše Vajnera Čiče 13, 51000, Rijeka', radno_vrijeme: '24/7' },
        { id: 4, naslov: 'Tenis klub Kvarner', lokacija: 'Ul. Ede Jardasa 27 a, 51000, Rijeka', radno_vrijeme: 'Svaki dan, 7 AM - 11 PM' },
        { id: 5, naslov: 'Kantrida Swimming Pools', lokacija: 'Podkoludricu 2, 51000, Rijeka', radno_vrijeme: 'Ponedjeljka do Subote,  7 AM - 11 PM' }
      ]


    const filteredOprema = ref([]);
    const filteredTereni = ref([]);

    const performSearch = () => {
      if (!searchQuery.value) {
        filteredOprema.value = [];
        filteredTereni.value = [];
        return;
      }
      filteredOprema.value = oprema.filter(predmet => {
        const matchesTitle = searchByTitle.value && predmet.naslov.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesOpis = searchByOpis.value && predmet.opis.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesTitle || matchesOpis;
      });
      filteredTereni.value = tereni.filter(teren => {
        const matchesIme = searchByIme.value && teren.naslov.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesLokacija = searchByLokacija.value && teren.lokacija.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesIme || matchesLokacija;
      });
    };
    

    return {
      searchQuery,
      searchByTitle,
      searchByOpis,
      searchByIme,
      searchByLokacija,
      columns,
      columnst,
      oprema,
      tereni,
      filteredOprema,
      filteredTereni,
      performSearch
    };
  }
};
</script>
