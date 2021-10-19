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
      :items="hunts_players().data"
      :headers="hunts_playersHeaders"
    />
    <funkysheep-service
      service="/api/game/steps"
    />
    <div id="map-wrap" style="height: 600px; width: 800px">
      <client-only>
        <l-map
          ref="myMap"
          :maxZoom="100"
          :zoom="13"
          :center="[44.63834,4.37998]"
          @click="mapClick"
        >
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker
            v-for="step in steps().data"
            :key="step._id"
            :lat-lng="[step.latitude, step.longitude]"
            :title="step.name"
            :draggable="true"
            @dragend="markerMove(step, $event)"
          >
            <l-tooltip>{{ step.name }}</l-tooltip>
          </l-marker>
          <v-rotated-marker
            v-for="player in hunts_players().data"
            :key="player._id"
            :lat-lng="[player.latitude, player.longitude]"
            :rotation-angle="player.heading"
          >
            <l-icon
              :iconSize="[30, 30]"
              :iconAnchor="[20, 20]"
            >
              <v-icon
                size="30px"
                class="userClass"
                color="orange"
              >
                {{ svgPath }}
              </v-icon>
            </l-icon>
            <l-tooltip>{{ player.nickname }}</l-tooltip>
          </v-rotated-marker>
        </l-map>
      </client-only>
    </div>
  </section>
</template>
<script>
import Vue2LeafletRotatedMarker from 'vue2-leaflet-rotatedmarker'
import { mdiNavigation } from '@mdi/js'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    'v-rotated-marker': Vue2LeafletRotatedMarker
  },
  data () {
    return {
      svgPath: mdiNavigation,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 20,
      center: [44.63841, 4.3801],
      markerLatLng: [44.63841, 4.3801]
    }
  },
  computed: {
    ...mapGetters('/api/game/hunts', { hunts: 'find', get: 'get' }),
    ...mapGetters('/api/game/hunts_players', { hunts_players: 'find', get: 'get' }),
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
    hunts_playersHeaders () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Latitude',
          value: 'latitude'
        },
        {
          text: 'longitude',
          value: 'longitude'
        },
        {
          text: 'Altitude',
          value: 'altitude'
        },
        {
          text: 'Heading',
          value: 'heading'
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
    this.findHunts_players()
    this.findSteps()
  },
  methods: {
    ...mapActions('/api/game/hunts', { findHunts: 'find', patch: 'patch', remove: 'remove' }),
    ...mapActions('/api/game/hunts_players', { findHunts_players: 'find' }),
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
  .userClass
  {
    font-size: 30px;
    background:red;
    border:5px solid rgba(255,255,255,0.5);
    color:blue;
    font-weight:bold;
    text-align:center;
    border-radius:50%;
    line-height:30px;
    vertical-align: left;
  }

  .triangle-code
  {
    display : inline-block;
    height : 0;
    width : 0;
    border-right : 1em solid transparent;
    border-bottom : 2em solid red;
    border-left : 1em solid transparent;
  }
</style>
