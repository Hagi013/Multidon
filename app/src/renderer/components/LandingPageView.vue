<template>
  <div id="landingPage">
    <div class="sidebar">
      <SidebarView></SidebarView>
    </div>
    <div class ="timelines">
      <div class="Home">
        <div class="timeline">
          <h1>Home</h1>
          <img @click="update_toot('Home')" src="../../../icons/Update.png">
          <TimelineView :timeline="homeTimeline" :type="typeHome"></TimelineView>
          <img @click="update_old_toot('Home')" src="../../../icons/Update.png">
        </div>
      </div>
      <div class="Local">
        <div class="timeline">
          <h1>ローカル</h1>
          <img @click="update_toot('Local')" src="../../../icons/Update.png">
          <TimelineView :timeline="localTimeline" :type="typeLocal"></TimelineView>
          <img @click="update_old_toot('Local')" src="../../../icons/Update.png">
        </div>
      </div>
      <div class="Public">
          <div class="timeline">
            <h1>連合</h1>
            <img @click="update_toot('Public')" src="../../../icons/Update.png">
            <TimelineView :timeline="publicTimeline" :type="typePublic"></TimelineView>
            <img @click="update_old_toot('Public')" src="../../../icons/Update.png">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Setting from './Setting'
import TimelineView from './Timeline/Timeline'
import SidebarView from './Sidebar/Sidebar'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'landingPage',
  data () {
    return {
      typeHome: 'Home',
      typeLocal: 'Local',
      typePublic: 'Public',
      homeTimeline: '',
      localTimeline: '',
      publicTimeline: ''
    }
  },
  methods: {
    ...mapActions(['fetchTimelines', 'fetchLatestTimelines', 'fetchOldTimelines']),
    ...mapGetters(['getTimelineList']),
    async update_toot (type) {
      await this.fetchLatestTimelines(type)
      if (type === 'Home') this.homeTimeline = this.getTimelineList()('Home')[0]
      if (type === 'Public') this.publicTimeline = this.getTimelineList()('Public')[0]
      if (type === 'Local') this.localTimeline = this.getTimelineList()('Local')[0]
    },
    async update_old_toot (type) {
      await this.fetchOldTimelines(type)
      if (type === 'Home') this.homeTimeline = this.getTimelineList()('Home')[0]
      if (type === 'Public') this.publicTimeline = this.getTimelineList()('Public')[0]
      if (type === 'Local') this.localTimeline = this.getTimelineList()('Local')[0]
    }
  },
  created () {
  },
  async mounted () {
    await this.fetchTimelines('Home')
    await this.fetchTimelines('Local')
    await this.fetchTimelines('Public')
    this.homeTimeline = this.getTimelineList()('Home')[0]
    this.localTimeline = this.getTimelineList()('Local')[0]
    this.publicTimeline = this.getTimelineList()('Public')[0]
  },
  computed: {
  },
  components: {
    Setting, TimelineView, SidebarView
  }
}
</script>

<style scoped>
  #landingPage {
    color: white;
    display: flex;
  }
  .sidebar {
    float:left;
    position: fixed;
    top: 0;
    height: 100%;
    min-height: 900px;
    z-index: 2000;
    background-color: #353535;
  }
  .timelines {
    margin-left: 64px;
    width: 100%;
  }
  .Home {
    margin-left: 0px;
    width: 100%;
  }
  .Local {
    margin-left: 340px;
    width: 100%;
  }
  .Public {
    margin-left: 680px;
    width: 100%;
  }
  .timeline {
    display: inline-block;
    text-align: center;
    background-color: #7a6060;
    top: 0;
    height: 100%;
    overflow: scroll;
    position: absolute;
  }
</style>
