<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        separator="horizontal"
        title="Popis terena"
        title-class="text-h4 text-bold text-red-9"
        :rows="books"
        :columns="columns"
        row-key="id"
        table-class="text-black"
        table-style="border: 3px solid black;"
        table-header-style="height: 65px"
        table-header-class="bg-red-2"
        bordered
        flat
        square
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span v-if="col.name != 'slika' && col.name != 'opis'">
                {{ col.value }}
              </span>
              <div v-if="col.name == 'opis'">
                <div class="tbl_opis">
                  {{ props.row.opis }}
                </div>
              </div>
              <q-img
                :src="props.row.slika"
                v-if="col.name == 'slika'"
                size="100px"
                class="shadow-10"
              >
              </q-img>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

const style1 = {
  fontSize: "18px",
};
const style2 = {
  fontSize: "24px",
};

const columns = [
  {
    name: "Naziv terena",
    label: "Naziv terena",
    field: "naziv",
    align: "left",
    sortable: true,
    style: style1,
    headerStyle: style2,
  },
  {
    name: "Lokacija terena",
    label: "Lokacije terena",
    field: "lokacija",
    align: "left",
    style: style1,
    headerStyle: style2,
  },
  {
    name: "Radno vrijeme",
    label: "Radno vrijeme",
    field: "radno_vrijeme",
    align: "left",
    style: style1,
    headerStyle: style2,
  },
];
let books = ref([]);

export default {
  setup() {
    return {
      columns,
      books,
      pagination: ref({
        rowsPerPage: 10,
      }),
    };
  },

  mounted() {
    this.loadBooks();
  },
  methods: {
    async loadBooks() {
      await axios
        .get("http://localhost:3000/api/tereni/")
        .then((result) => {
          console.log(result.data.data);
          this.books = result.data;
          console.log(this.books[0].id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
