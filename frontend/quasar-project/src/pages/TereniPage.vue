<template>
  <q-page padding>
    <!-- Naslov i popratni tekst -->
    <div class="text-center q-mb-md">
      <h1>Tereni</h1>
      <p>Pregled svih terena.</p>
    </div>

    <q-table
      :rows="tereni"
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
    const tereni = [
      {
        id: 1,
        naslov: 'HNK Rijeka Stadium Rujevica',
        lokacija: 'Rujevica 10, 51000, Rijeka',
        slika: '', // Ovdje možete staviti praznu putanju ili ukloniti ovo polje
        radno_vrijeme: 'Svaki dan, 8 AM - 8 PM'
      },
      {
        id: 2,
        naslov: 'Muški rukometaški klub "Kozala"',
        lokacija: 'Kozala 37, 51000, Rijeka',
        slika: '', // Ovdje možete staviti praznu putanju ili ukloniti ovo polje
        radno_vrijeme: 'Ponedjeljka do Petka, 6 PM - 10:30 PM'
      },
      {
        id: 3,
        naslov: 'Košarkaški klub "KVARNER 2010"',
        lokacija: 'Ul. Slaviše Vajnera Čiče 13, 51000, Rijeka',
        slika: '', // Ovdje možete staviti praznu putanju ili ukloniti ovo polje
        radno_vrijeme: '24/7'
      },
      {
        id: 4,
        naslov: 'Tenis klub Kvarner',
        lokacija: 'Ul. Ede Jardasa 27 a, 51000, Rijeka',
        slika: '', // Ovdje možete staviti praznu putanju ili ukloniti ovo polje
        radno_vrijeme: 'Svaki dan, 7 AM - 11 PM'
      },
      {
        id: 5,
        naslov: 'Kantrida Swimming Pools',
        lokacija: 'Podkoludricu 2, 51000, Rijeka',
        slika: '', // Ovdje možete staviti praznu putanju ili ukloniti ovo polje
        radno_vrijeme: 'Ponedjeljka do Subote,  7 AM - 11 PM'
      }
    ];

    // Kolone za tablicu
    const columns = [
      { name: 'id', label: 'ID', align: 'left', field: 'id' },
      { name: 'naslov', label: 'Naslov', align: 'left', field: 'naslov' },
      { name: 'lokacija', label: 'Lokacija', align: 'left', field: 'lokacija' },
      { name: 'slika', label: 'Slika', align: 'center', field: 'slika', format: val => '' }, // Bez prikaza slike
      { name: 'radno_vrijeme', label: 'Radno vrijeme', align: 'center', field: 'radno_vrijeme' }
    ];

    // Filtriranje (opcionalno)
    const filter = '';

    return {
      tereni,
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
