/**
 * Created by shuhei.hagiwara on 2017/05/05.
 */

import Toot from './toot'
import InstancePreferences from '../setting/instancePreference'

export default class timeline {
  constructor (type, tootlines) {
    this._timelineType = type || ''
    this._toots = this.instantiateToots(this.shapeToot(tootlines))
    this._instanceInTimeline = new TimelineInfoList(tootlines)// this.calcInstanceInfo(tootlines)
  }

  get timelineType () {
    return this._timelineType
  }

  get toots () {
    return this._toots
  }

  get instanceInTimeline () {
    return this._instanceInTimeline
  }

  set timelineType (target) {
    this._timelineType = target
  }

  set toots (target) {
    this._toots = target
  }

  set instanceInTimeline (target) {
    return this._instanceInTimeline
  }

  /*
   * @param {[...[...Object]]} tootlines
   *
  */
  shapeToot (tootlines) {
    let mergeTimeline = []
    tootlines.forEach(tootLine => {
      mergeTimeline = mergeTimeline.concat(tootLine)
    })
    // タイムラインのソート
    mergeTimeline = mergeTimeline.sort((e1, e2) => {
      return new Date(e2.created_at) - new Date(e1.created_at)
    })
    // 同じUriのトートがあった場合削除
    let selfUris = mergeTimeline.map(t => { return t.uri })
    let shapedTimeline = mergeTimeline.filter((e, i) => {
      return selfUris.indexOf(e.uri) === i
    })
    console.log('shapedTimeline', shapedTimeline.length)
    return shapedTimeline
  }

  instantiateToots (tootLinesObj) {
    let toots = []
    tootLinesObj.forEach(o => {
      toots.push(new Toot(o))
    })
    return toots
  }

}

class TimelineInfoList {
  constructor (tootlines) {
    this._timelineInfoList = this.calcInstanceInfo(tootlines)
  }

  get timelineInfoList () {
    return this._timelineInfoList
  }

  calcInstanceInfo (tootlines) {
    let instanceInTimeline = []
    const instanceLocalUrl = new InstancePreferences().instancePreferecesFromLocalStorage().getIncetanceUrlArray()

    tootlines.forEach(tl => {
      if (tl[0] === undefined || tl[0] === null || Object.keys(tl[0]).length === 0) return

      let tli = new TimelineInfo({
        url: tl[0].instanceUrl,
        startId: tl[0].id,
        endId: tl[0].id
      })

      tl.forEach(t => {
        tli.url = tli.url === '' ? instanceLocalUrl.indexOf(t.url.match(/https:\/\/[a-zA-Z0-9.]+/)[0]) !== -1 ? t.url.match(/https:\/\/[a-zA-Z0-9.]+/)[0] : '' : tli.url
        tli.startId = Math.min(tli.startId, t.id)
        tli.endId = Math.max(tli.endId, t.id)
      })
      instanceInTimeline.push(tli)
    })
    return instanceInTimeline
  }
}

class TimelineInfo {
  constructor (timeline) {
    this._url = timeline.url
    this._startId = timeline.startId
    this._endId = timeline.endId
  }

  get url () {
    return this._url
  }

  get startId () {
    return this._startId
  }

  get endId () {
    return this._endId
  }

  set url (target) {
    this._url = target
  }

  set startId (target) {
    this._startId = target
  }

  set endId (target) {
    this._endId = target
  }

}
