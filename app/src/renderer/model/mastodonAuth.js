/**
 * Created by shuhei.hagiwara on 2017/04/29.
 */
import Mastodon from 'mastodon-api'
const {BrowserWindow} = require('electron').remote

export default class MastodonAuth {
  constructor (baseUrl) {
    this.baseUrl = baseUrl || 'https://mstdn.jp'
    this.clientId = ''
    this.clientSecret = ''
    this.accessToken = ''
  }

  get baseUrl () {
    return this._baseUrl
  }

  set baseUrl (targetUrl) {
    this._baseUrl = targetUrl
  }

  get clientId () {
    return this._clientId
  }

  set clientId (targetClientId) {
    this._clientId = targetClientId
  }

  get clientSecret () {
    return this._clientSecret
  }

  set clientSecret (targetClientSecret) {
    this._clientSecret = targetClientSecret
  }

  get accessToken () {
    return this._accessToken
  }

  set accessToken (targetAccessToken) {
    this._accessToken = targetAccessToken
  }

  async createCode () {
    const res = await Mastodon.createOAuthApp(this.baseUrl + '/api/v1/apps', 'multidon', 'read write follow')
      .catch(err => console.error(err))

    console.log('Please save \'id\', \'client_id\' and \'client_secret\' in your program and use it from now on!')
    console.log(res)

    this.clientId = res.client_id
    this.clientSecret = res.client_secret

    let url = await Mastodon.getAuthorizationUrl(this.clientId, this.clientSecret, this.baseUrl)
    console.log('This is the authorization URL. Open it in your browser and authorize with your account!')
    console.log('url:   ', url)
    let win = new BrowserWindow({width: 800, height: 600})
    return new Promise((resolve, reject) => {
      win.loadURL(url)
    })
  }

  async getAccessToken (code) {
    this.accessToken = await Mastodon.getAccessToken(this.clientId, this.clientSecret, code, this.baseUrl)
    console.log(`This is the access token. Save it!\n${this.accessToken}`)
    return this
  }
}
