<template>
  <section>
    <v-data-table
      :items="hunts().data"
      :headers="huntsHeaders"
    >
      <template #[`item.remove`]="{ item }">
        <v-btn
          @click="remove(item._id)"
        >
          <v-icon
            color="red"
          >
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-data-table
      :items="steps().data"
      :headers="stepsHeaders"
    >
    </v-data-table>
    <div id="map-wrap" style="height: 400px; width: 400px">
      <client-only>
        <l-map @click="mapClick" ref="myMap" :zoom=13 :center="[44.63834,4.37998]">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
          <l-marker
            v-for="step in steps().data"
            :key="step._id"
            :lat-lng="[step.latitude, step.longitude]"
            :title="step.name"
            :draggable="true"
            @dragend= "markerMove(step, $event)"
          />
        </l-map>
      </client-only>
      {{ markerLatLng }}
    </div>
  </section>
</template>
<script>
//  import L from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [44.63841, 4.3801],
      markerLatLng: [44.63841, 4.3801]
    }
  },
  computed: {
    ...mapGetters('/api/game/hunts', { hunts: 'find', get: 'get' }),
    ...mapGetters('/api/game/steps', { steps: 'find', get: 'get' }),
    huntsHeaders () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Remove',
          value: 'remove'
        }
      ]
    },
    stepsHeaders () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Latitude',
          value: 'latitude'
        },
        {
          text: 'Longitude',
          value: 'longitude'
        },
        {
          text: 'Altitude',
          value: 'altitude'
        }
      ]
    }
  },
  mounted () {
    this.findHunts()
    this.findSteps()
  },
  methods: {
    ...mapActions('/api/game/hunts', { findHunts: 'find', patch: 'patch', remove: 'remove' }),
    ...mapActions('/api/game/steps', { findSteps: 'find', patchStep: 'patch', removeStep: 'remove' }),
    admin (_id, admin) {
      this.patch([
        _id,
        { admin }
      ])
    },
    guest (_id, admin) {
      this.patch([
        _id,
        { admin }
      ])
    },
    mapClick (event) {
      console.log(event)
    },
    markerMove (step, event) {
      this.patchStep([
        step._id,
        {
          latitude: event.target._latlng.lat,
          longitude: event.target._latlng.lng
        }
      ])
    }
  }
}
</script>
<style>
</style>
