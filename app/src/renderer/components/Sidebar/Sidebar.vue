<template>
  <div id="sidebar">
    <div class="Setting">
      <img @click='to_setting' src="../../../../icons/Setting.png">
    </div>
  </div>
</template>
<script>

import router from '../../routes'

export default {
  name: 'sidebar',
  props: [],
  data () {
    return {
    }
  },
  methods: {
    to_setting () {
      router.push('/setting')
    }
  },
  mounted () {},
  components: {}
}

</script>
<style scoped>

</style>
