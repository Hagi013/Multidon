<template>
  <div id="timeline" role="region" aria-labelledby="type">
    <div v-for="toot in timeline.toots">
      <Toot :toot="toot"></Toot>
      <hr />
    </div>
  </div>
</template>
<script>
import Toot from './Toot.vue'

export default {
  name: 'timeline',
  props: ['timeline', 'type'],
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {},
  components: {Toot}
}

</script>
<style scoped>

</style>
