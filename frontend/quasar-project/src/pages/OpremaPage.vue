<template>
  <q-page padding>
    <!-- Naslov i popratni tekst -->
    <div class="text-center q-mb-md">
      <h1>Oprema</h1>
      <p>Pregled sve opreme.</p>
    </div>

    <q-table
      :rows="oprema"
      :columns="columns"
      row-key="id"
      :filter="filter"
    >
    </q-table>
  </q-page>
</template>

<script>
export default {
  setup() {
    const oprema = [
      {
        id: 1,
        naslov: 'Nogometni dres',
        opis: 'Dres za igranje nogometa',
        slika: '', // Ovdje možete staviti praznu putanju ili ukloniti ovo polje
        stanje: 14
      },
      {
        id: 2,
        naslov: 'Lopta za nogomet',
        opis: 'Lopta za profesionalce.',
        slika: '', // Ovdje možete staviti praznu putanju ili ukloniti ovo polje
        stanje: 86
      },
      {
        id: 3,
        naslov: 'Dres za košarku',
        opis: 'Igrajte košarku kao profesionalac.',
        slika: '', // Ovdje možete staviti praznu putanju ili ukloniti ovo polje
        stanje: 35
      },
      {
        id: 4,
        naslov: 'Lopta za košarku',
        opis: 'Igrajte košarku kao Michael Jordan.',
        slika: '', // Ovdje možete staviti praznu putanju ili ukloniti ovo polje
        stanje: 32
      },
      {
        id: 5,
        naslov: 'Reket za tenis',
        opis: 'Profesionalni reket.',
        slika: '', // Ovdje možete staviti praznu putanju ili ukloniti ovo polje
        stanje: 79
      }
    ];

    // Kolone za tablicu
    const columns = [
      { name: 'id', label: 'ID', align: 'left', field: 'id' },
      { name: 'naslov', label: 'Naslov', align: 'left', field: 'naslov' },
      { name: 'opis', label: 'Opis', align: 'left', field: 'opis' },
      { name: 'slika', label: 'Slika', align: 'center', field: 'slika', format: val => '' }, // Bez prikaza slike
      { name: 'stanje', label: 'Stanje', align: 'center', field: 'stanje' }
    ];

    // Filtriranje (opcionalno)
    const filter = '';

    return {
      oprema,
      columns,
      filter
    };
  }
};
</script>

<style scoped>
.q-page {
  padding: 20px;
}

.text-center {
  text-align: center;
}

.q-mb-md {
  margin-bottom: 20px;
}

.q-table {
  margin-top: 20px;
}
</style>
