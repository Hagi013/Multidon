/**
 * Created by shuhei.hagiwara on 2017/06/01.
 */

export default class InstancePreferences {
  constructor () {
    this._instancePreferences = []
  }

  get instancePreferences () {
    return this._instancePreferences
  }

  set instancePreferences (target) {
    this._instancePreferences.push(target)
  }

  instancePreferecesFromLocalStorage () {
    const preferences = JSON.parse(localStorage.getItem('mastodon-config'))
    preferences.forEach(p => {
      this.instancePreferences = new InstancePreference(p)
    })
    return this
  }

  getIncetanceUrlArray () {
    return this.instancePreferences.map(p => {
      return p.baseUrl
    })
  }
}

class InstancePreference {
  constructor (target) {
    this._baseUrl = target.baseUrl
    this._clientId = target.clientId
    this._clientSecret = target.clientSecret
    this._accessToken = target.accessToken
  }

  get baseUrl () {
    return this._baseUrl
  }
  get clientId () {
    return this._clientId
  }
  get clientSecret () {
    return this._clientSecret
  }
  get accessToken () {
    return this._accessToken
  }

}
