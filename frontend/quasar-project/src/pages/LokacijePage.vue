<template>
  <div id="map" style="height:500px;"></div>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

export default {
  // name: 'PageName',
  setup(){
    const initialMap = ref('');
    onMounted(() => {
        initialMap.value = L.map('map').setView([45.3312,14.4322], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(initialMap.value);
      })
      return {
        initialMap
      }
    }
}

</script>
