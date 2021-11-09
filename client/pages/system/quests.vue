<template>
  <section>
    <funkysheep-service
      service="/api/game/quests"
      hide-fields
    />
    <funkysheep-service
      service="/api/game/quest_players"
      hide-fields
    />
    <funkysheep-service
      service="/api/game/quest_paths"
      hide-fields
    />
    <funkysheep-service
      service="/api/game/steps"
      hide-fields
    />
    <funkysheep-service
      service="/api/game/points_clouds"
      hide-fields
    />
    <div id="map-wrap" style="height: 400px; width: 800px">
      <client-only>
        <l-map
          ref="myMap"
          :zoom="13"
          :max-zoom="50"
          :center="[44.63834,4.37998]"
          @click="mapClick"
        >
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            :options="{
              maxZoom:50,
              maxNativeZoom:19
            }"
          />
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
          <l-marker
            v-for="point in quest_paths().data"
            :key="point._id"
            :lat-lng="[point.virtual_latitude, point.virtual_longitude]"
            :title="point._id"
          >
            <l-tooltip>{{ point._id }}</l-tooltip>
            <l-icon
              :icon-size="[30, 30]"
              :icon-anchor="[20, 20]"
            >
              <v-icon
                size="20px"
                class="pathClass"
                color="yellow"
              >
                {{ svgPath }}
              </v-icon>
            </l-icon>
          </l-marker>
          <v-rotated-marker
            v-for="player in quests_players().data"
            :key="player._id"
            :lat-lng="[player.latitude, player.longitude]"
            :rotation-angle="player.heading"
          >
            <l-icon
              :icon-size="[30, 30]"
              :icon-anchor="[20, 20]"
            >
              <v-icon
                size="30px"
                class="userClass"
                color="blue"
              >
                {{ svgUser }}
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
import { mdiNavigation, mdiAdjust } from '@mdi/js'
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
      svgUser: mdiNavigation,
      svgPath: mdiAdjust,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 20,
      center: [44.63841, 4.3801],
      markerLatLng: [44.63841, 4.3801]
    }
  },
  computed: {
    ...mapGetters('/api/game/quests', { quests: 'find', get: 'get' }),
    ...mapGetters('/api/game/quest_players', { quests_players: 'find', get: 'get' }),
    ...mapGetters('/api/game/quest_paths', { quest_paths: 'find', get: 'get' }),
    ...mapGetters('/api/game/steps', { steps: 'find', get: 'get' }),
    questsHeaders () {
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
    quests_playersHeaders () {
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
    this.findQuests()
    this.findQuest_players()
    this.findQuest_paths()
    this.findSteps()
  },
  methods: {
    ...mapActions('/api/game/quests', { findQuests: 'find', patch: 'patch', remove: 'remove' }),
    ...mapActions('/api/game/quest_players', { findQuest_players: 'find' }),
    ...mapActions('/api/game/quest_paths', { findQuest_paths: 'find' }),
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
    mapClick (event) {},
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
    background:transparent;
    border:2px solid #2196F3;
    color:blue;
    font-weight:bold;
    text-align:center;
    border-radius:50%;
    line-height:30px;
    vertical-align: left;
  }

  .pathClass
  {
    font-size: 30px;
    background:transparent;
    border:2px solid #FFEB3B;
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
