/**
 * Created by shuhei.hagiwara on 2017/05/01.
 */

import axios from 'axios'

const PUBLIC_URL = '/public/'
const HOME_URL = '/home/'
const LOCAL_URL = 'local=true'
const LIMIT_40 = 'limit=40'

const PUBLIC_TYPE = 'Public'
const HOME_TYPE = 'Home'
const LOCAL_TYPE = 'Local'

export default class Mastodon {
  constructor (timeout) {
    this.timelineUrl = '/api/v1/timelines'
    this.permittedInstance = JSON.parse(localStorage.getItem('mastodon-config'))
    this.timeout_ms = timeout || 60 * 1000
  }

  /*
   *
   *@return {Mixed(promise|array)}
  */
  fetchHomeTimelines () {
    return this.fetchLatestTimeline(HOME_TYPE)
  }

  fetchLocalTimelines () {
    return this.fetchLatestTimeline(LOCAL_TYPE)
  }

  fetchPublicTimelines () {
    return this.fetchLatestTimeline(PUBLIC_TYPE)
  }

  fetchOlderHomeTimelines (startIdList) {
    return this.fetchOlderTimeline(startIdList, HOME_TYPE)
  }

  fetchOlderLocalTimelines (startIdList) {
    return this.fetchOlderTimeline(startIdList, LOCAL_TYPE)
  }

  fetchOlderPublicTimelines (startIdList) {
    return this.fetchOlderTimeline(startIdList, PUBLIC_TYPE)
  }

  fetchLatestTimeline (typeFlag) {
    let funcArray = []
    this.permittedInstance.forEach(instance => {
      const url = instance.baseUrl + this.timelineUrl

      if (typeFlag === HOME_TYPE) {
        const reqOpts = this.getOpts(instance)

        const getUrlStr = url + HOME_URL + '?' + LIMIT_40
        funcArray.push(axios.create(reqOpts).get(getUrlStr))
      } else {
        const getUrlStr = typeFlag === PUBLIC_TYPE ? url + PUBLIC_URL + '?' + LIMIT_40 : url + PUBLIC_URL + '?' + LIMIT_40 + '&' + LOCAL_URL
        funcArray.push(axios.get(getUrlStr))
      }
    })

    return axios.all(funcArray).then(res => { return this.getDataObject(res) })
  }

  fetchOlderTimeline (startIdList, typeFlag) {
    let funcArray = []
    this.permittedInstance.forEach(instance => {
      const url = instance.baseUrl + this.timelineUrl

      if (typeFlag === HOME_TYPE) {
        const reqOpts = this.getOpts(instance)
        const startIdObj = startIdList.filter(s => {
          return instance.baseUrl === s.url
        })[0]

        if (startIdObj === undefined || startIdObj === null) return
        const getUrlStr = url + HOME_URL + '?' + LIMIT_40 + '&' + 'max_id=' + startIdObj.startId
        funcArray.push(axios.create(reqOpts).get(getUrlStr))
      } else {
        const startIdObj = startIdList.filter(s => {
          return instance.baseUrl === s.url
        })[0]

        if (startIdObj === undefined || startIdObj === null) return

        const getUrlStr = typeFlag === PUBLIC_TYPE ? url + PUBLIC_URL + '?' + LIMIT_40 + '&' + 'max_id=' + startIdObj.startId : url + PUBLIC_URL + '?' + LIMIT_40 + '&' + LOCAL_TYPE + '&' + 'max_id=' + startIdObj.startId
        funcArray.push(axios.get(getUrlStr))
      }
    })

    return axios.all(funcArray).then(res => { return this.getDataObject(res) })
  }

  getDataObject (res) {
    const mergeTimeline = res.map(resObj => {
      resObj.data.forEach(toot => {
        toot.instanceUrl = resObj.request.responseURL.match(/https:\/\/[a-zA-Z0-9.]+/)[0]
      })
      return resObj.data
    })
    return mergeTimeline
  }

  getOpts (instance) {
    return {
      headers: {
        'Accept': '*/*',
        'Authorization': 'Bearer ' + instance.accessToken
      },
      gzip: true,
      encoding: null,
      timeout: this.timeout_ms
    }
  }
}
