<template>
  <div id="setting">
    <button v-on:click="to_landing">go to landing</button>
    <div>インスタンスの追加</div>
    <input v-model="instance_url" placeholder="Instance Url">
    <button v-on:click="get_code">get code</button>
    <input v-model="code" placeholder="input code">
    <button v-on:click="get_access_token">get Access Token</button>
    <CurrentPage></CurrentPage>
    <div>
      <table>
        <thead>
          <tr>
            <th>Instance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="conf in confs">
            <td>{{ conf }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import router from '../routes'
import CurrentPage from './LandingPageView/CurrentPage.vue'
import MastodonAuth from '../model/mastodonAuth'

export default {
  name: 'setting-page',
  data () {
    return {
      mastodonAuth: new MastodonAuth(),
      instance_url: null,
      code: '',
      confs: Object.keys(JSON.parse(localStorage.getItem('mastodon-config'))).map(e => Object.keys(JSON.parse(localStorage.getItem('mastodon-config'))[e])).map(a => a[0])
    }
  },
  methods: {
    to_landing () {
      router.push('/')
    },
    get_code () {
      if (this.instance_url !== null && this.instance_url !== '' || this.instance_url !== undefined) {
        this.mastodonAuth = new MastodonAuth(this.instance_url)
      }
      if (this.instance_url !== '' && this.instance_url !== null && this.instance_url !== undefined) {
        this.mastodonAuth.createCode(this.instance_url)
      } else {
        this.mastodonAuth.createCode()
      }
    },
    async get_access_token () {
      this.mastodonAuth = await this.mastodonAuth.getAccessToken(this.code)
      console.log('this.mastodonAuth', this.mastodonAuth)
      this.set_local_storage()
    },
    set_local_storage () {
      if (Object.keys(this.mastodonAuth).length === 0 || this.mastodonAuth === undefined || this.mastodonAuth === null) return
      let conf = {}
      const savedConfs = JSON.parse(localStorage.getItem('mastodon-config'))
      // mastodonのインスタンスに関わるaccessTokenなどがすでに登録されているかのチェック
      if (savedConfs !== null && savedConfs !== undefined) {
        // mastodonのインスタンス情報が重複している場合(更新の場合)
        let baseUrlArray = Object.keys(savedConfs).map(e => savedConfs[e].baseUrl)
        if (baseUrlArray.indexOf(this.mastodonAuth.baseUrl) >= 0) {
          const confs = savedConfs.concat()
          confs.forEach(e => {
            if (e.baseUrl === this.mastodonAuth.baseUrl) {
              e.clientId = this.mastodonAuth.clientId
              e.clientSecret = this.mastodonAuth.clientSecret
              e.accessToken = this.mastodonAuth.accessToken
            }
          })
          localStorage.setItem('mastodon-config', JSON.stringify(confs))
        } else { // 追加登録の場合
          conf = {
            baseUrl: this.mastodonAuth.baseUrl,
            clientId: this.mastodonAuth.clientId,
            clientSecret: this.mastodonAuth.clientSecret,
            accessToken: this.mastodonAuth.accessToken
          }
          savedConfs.push(conf)
          localStorage.setItem('mastodon-config', JSON.stringify(savedConfs))
        }
      } else { // 初めての登録の場合
        conf = {
          baseUrl: this.mastodonAuth.baseUrl,
          clientId: this.mastodonAuth.clientId,
          clientSecret: this.mastodonAuth.clientSecret,
          accessToken: this.mastodonAuth.accessToken
        }
        console.log('OK', conf)
        localStorage.setItem('mastodon-config', JSON.stringify([conf]))
      }
    }
  },
  mounted: () => {},
  components: {
    CurrentPage
  }
}

</script>
<style scoped>
img {
    margin-top: -25px;
    width: 450px;
}
body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
    );
    background-position: center;
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
}
</style>
