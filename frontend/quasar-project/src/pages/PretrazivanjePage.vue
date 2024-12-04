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
        <q-checkbox v-model="searchByTitle" label="Pretraži po opremi" />
        <q-checkbox v-model="searchByAuthor" label="Pretraži po terenu" />
      </div>

      <q-btn label="Traži" color="primary" @click="performSearch" />

      <q-table
        v-if="filteredBooks.length"
        :rows="filteredBooks"
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

export default {
  setup() {
    const searchQuery = ref('');
    const searchByTitle = ref(true);
    const searchByAuthor = ref(false);

    const columns = [
      { name: 'id', label: 'ID', align: 'left', field: row => row.id },
      { name: 'naslov', label: 'Naslov', align: 'left', field: row => row.naslov },
      { name: 'opis', label: 'Opis', align: 'left', field: row => row.opis },
      { name: 'stanje', label: 'Stanje', align: 'right', field: row => row.stanje }
    ];

    const books = [
        { id: 1, naslov: 'Nogometni dres', opis: 'Dres za igranje nogometa.', stanje: 14 },
        { id: 2, naslov: 'Lopta za nogomet', opis: 'Lopta za profesionalce.', stanje: 86 },
        { id: 3, naslov: 'Dres za košarku', opis: 'Igrajte košarku kao profesionalac', stanje: 35 },
        { id: 4, naslov: 'Lopta za košarku', opis: 'Igrajte košarku kao Michael Jordan.', stanje: 32 },
        { id: 5, naslov: 'Reket za tenis', opis: 'Profesionalni reket.', stanje: 79 }
      ]


    const filteredBooks = ref([]);

    const performSearch = () => {
      if (!searchQuery.value) {
        filteredBooks.value = [];
        return;
      }
      filteredBooks.value = books.filter(book => {
        const matchesTitle = searchByTitle.value && book.naslov.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesAuthor = searchByAuthor.value && book.autor.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesTitle || matchesAuthor;
      });
    };

    return {
      searchQuery,
      searchByTitle,
      searchByAuthor,
      columns,
      books,
      filteredBooks,
      performSearch
    };
  }
};
</script>
