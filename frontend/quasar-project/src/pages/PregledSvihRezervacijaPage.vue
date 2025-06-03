<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Pregled svih rezervacija</div>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="rezervacije"
          :columns="kolone"
          row-key="id"
          flat
          bordered
          no-data-label="Nema dostupnih rezervacija"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios"; // provjeri da koristiš pravi axios instance

const $q = useQuasar();
const rezervacije = ref([]);

const kolone = [
  {
    name: "sifra_narudzbe",
    label: "ID",
    align: "left",
    field: "sifra_narudzbe",
  },
  {
    name: "ime_korisnika",
    label: "Ime",
    align: "left",
    field: "ime_korisnika",
  },
  {
    name: "prezime_korisnika",
    label: "Prezime",
    align: "left",
    field: "prezime_korisnika",
  },
  {
    name: "naziv_terena",
    label: "Teren",
    align: "left",
    field: "naziv_terena",
  },
  {
    name: "datum_iznajmljivanja",
    label: "Datum",
    align: "left",
    field: "datum_iznajmljivanja",
  },
];

const dohvatiRezervacije = async () => {
  try {
    const response = await api.get("/rezervacije");
    rezervacije.value = response.data;
  } catch (err) {
    console.error(err);
    $q.notify({
      type: "negative",
      message: "Greška pri dohvaćanju rezervacija",
    });
  }
};

onMounted(dohvatiRezervacije);
</script>
