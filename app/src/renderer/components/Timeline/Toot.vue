<template>
  <div id="toot">
    <ul>
      <div class="toot">
        <table>
          <td>
            <div v-if="toot.content !== `<p></p>`">
              <img class="toot-img" :src="toot.account.avatar" />
            </div>
            <div v-else-if="toot.content === `<p></p>`">
              <img class="toot-img" :src="toot.reblog.account.avatar" />
            </div>
          <td>
          <td>
            <div class="toot-content">
              <li>
                <span v-if="toot.content !== `<p></p>`">
                  {{toot.account.displayName}}  {{toot.createdAt}}
                </span>
                <span v-else-if="toot.content === `<p></p>`">
                  boosted by {{toot.account.displayName}}
                <br />
                  {{toot.reblog.account.displayName}} {{toot.reblog.createdAt}}
                </span>
              </li>
              <li>
                <div v-if="toot.content !== `<p></p>`">
                  <span v-html="toot.content"></span>
                </div>
                <div v-else-if="toot.content === `<p></p>`">
                  <span v-html="toot.reblog.content"></span>
                </div>
              </li>
              <!--<ul v-for=" media in timeline.mediaAttachments">
                <li >
                  &lt;!&ndash;<a href="media.text_url">&ndash;&gt;
                    <img src="media.previewUrl" />
                  &lt;!&ndash;</a>&ndash;&gt;
                </li>
              </ul>-->
            </div>
          </td>
          <hr />
        </table>
      </div>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'toot',
  props: ['toot'],
  data () {
    return {
    }
  },
  methods: {},
  mounted () {
  },
  components: {}
}

</script>
<style scoped>

.toot {
  width: 300px;
  margin: 10px 20px;
  padding: 10px;
  color: white;
}

td {
  text-align:center;
  vertical-align:middle;
}

.toot-img {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;
}

.toot-content {
  padding: 5px;
  margin: 0 10px;
  width: 240px;
  display: inline-block;
  word-wrap:break-word;
}
</style>
