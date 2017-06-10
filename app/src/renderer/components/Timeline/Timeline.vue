<template>
  <div id="timeline" role="region" aria-labelledby="type">
    <div class="instance-select-box">
      <select v-model="selectedInstance" multiple @change="mutateTootVisbility">
        <option v-for="selectedInstance in instanceOptions" :value="selectedInstance">
          {{ selectedInstance }}
        </option>
      </select>
    </div>
    <div v-for="toot in timeline.toots">
      <Toot :toot="toot"></Toot>
    </div>
  </div>
</template>
<script>
import Toot from './Toot.vue'
import { mapGetters, mapActions } from 'vuex'
import InstancePreferences from '../../model/setting/instancePreference'

export default {
  name: 'timeline',
  props: ['timeline', 'type'],
  data () {
    return {
      instanceOptions: [],
      selectedInstance: []
    }
  },
  methods: {
    ...mapGetters(['getInstanceUrl']),
    ...mapActions(['mutateTootVisibility']),
    mutateTootVisbility () {
      const payload = {
        urlList: this.selectedInstance,
        type: this.type
      }
      this.mutateTootVisibility(payload)
    }
  },
  mounted () {
    const i = new InstancePreferences().instancePreferecesFromLocalStorage()
    const urlList = i.getIncetanceUrlArray()
    this.instanceOptions = urlList
    this.selectedInstance = urlList
  },
  components: {Toot}
}

</script>
<style scoped>
.instance-select-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
