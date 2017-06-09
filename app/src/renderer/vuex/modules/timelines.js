/**
 * Created by shuhei.hagiwara on 2017/05/05.
 */
import * as types from '../mutation-types'

const state = {
  timelineList: []
}

const helper = {
  checkInvalidObj (payload) {
    return (payload === null || Object.keys(payload).length === 0 || payload === undefined)
  },
  // Typeに一致する現在のTimelineのを取得
  getMatchingTypeTL (state, type) {
    return state.timelineList.filter(tl => {
      return tl.timelineType === type
    }).concat([])[0]
  },
  // タイムラインを比較し同じ内容であれば除外
  excludeSameTL (currentTl, addTl) {
    let currentUrlList = currentTl.toots.map(toot => { return toot.url })
    addTl.toots = addTl.toots.filter(toot => {
      return currentUrlList.indexOf(toot.url) === -1
    })
    return addTl
  },
  // TimelineListにTootを追加
  addTimelineList (currentTl, addTl) {
    currentTl.toots = currentTl.toots.concat(addTl.toots)
    return currentTl
  },
  // Tootを作成順に並び替え
  sortToot (timeline) {
    timeline.toots = timeline.toots.sort((s1, s2) => {
      return new Date(s2.createdAt) - new Date(s1.createdAt)
    })
    return timeline
  },
  // Vuexで管理されたstateにTootを追加
  commitTimeline (timeline, type) {
    state.timelineList.forEach(tl => {
      if (tl.timelineType === type) tl = timeline
    })
  }
}

const mutations = {

  /*
   * @param {Timeline} payload
   */
  [types.ADD_TIMELINE] (state, payload) {
    if (payload === null || payload === undefined || Object.keys(payload).length === 0) return
    state.timelineList.push(payload)
  },
  /* 更新があったタイムラインのstartId, endIdを置き換える(実態はTimeline毎置き換え)
   * @param {Timeline} payload
   */
  [types.REPLACE_TIMELINE] (state, payload) {
    if (payload === null || payload === undefined || Object.keys(payload).length === 0) return
    state.timelineList = state.timelineList.map(tl => {
      if (tl.timelineType === payload.timelineType) {
        tl.instanceInTimeline.timelineInfoList.forEach((instance, i) => {
          if (instance.url === payload.instanceInTimeline.timelineInfoList.url) {
            tl.instanceInTimeline.timelineInfoList[i] = payload.instanceInTimeline.timelineInfoList
          }
        })
      }
      return tl
    })
  },
  /* タイムラインに表示するインスタンスを変更する
   * @param {{
   *  type: timeline.type(string)
   *  urlList: [Timeline.instanceInTimeline.url(string)]
   * }} payload
   */
  [types.MODIFY_INSTANCE] (state, payload) {
    state.timelineList = state.timelineList.map(tl => {
      if (tl.timelineType === payload.type) {
        tl = tl.toots.map(t => {
          t.viewFlag = false
          payload.urlList.forEach(url => {
            if (url === t.instanceUrl) {
              t.viewFlag = true
            }
          })
          return t
        })
      }
      return tl
    })
  },
  /* タイムラインに最新のタイムラインを追加する
   * @param {{
   *  type: timeline.type(string)
   *  timeline: Timeline
   * }} payload
   */
  [types.ADD_LATEST_TOOT] (state, payload) {
    if (payload === null || Object.keys(payload).length === 0 || payload === undefined) return
    const latestTL = payload.timeline
    const type = payload.type

    // Typeに一致する現在のTimelineのを取得
    const currentTl = state.timelineList.filter(tl => {
      return tl.timelineType === type
    }).concat([])[0]

    // 現在のTimelineのUrlのリストを取得し、Add予定のタイムラインと同じUrlがあれば除外
    let currentUrlList = currentTl.toots.map(toot => { return toot.url })
    latestTL.toots = latestTL.toots.filter(toot => {
      return currentUrlList.indexOf(toot.url) === -1
    })

    // Vuexで管理しているTimelineListにTootを追加
    currentTl.toots = currentTl.toots.concat(latestTL.toots)

    // Tootの作成順に並び替え
    currentTl.toots = currentTl.toots.sort((s1, s2) => {
      return new Date(s2.createdAt) - new Date(s1.createdAt)
    })

    // endIdを最新化
    currentTl.instanceInTimeline.timelineInfoList.forEach(stateInstance => {
      latestTL.instanceInTimeline.timelineInfoList.forEach(latestInstance => {
        if (latestInstance.url === stateInstance.url) stateInstance.endId = latestInstance.endId
      })
    })

    // Vuexで管理されたstateにTootを追加
    state.timelineList.forEach(tl => {
      if (tl.timelineType === type) tl = currentTl
    })
  },
  [types.ADD_NEWER_TOOT] (state, payload) {
    // state.timelineList =
  },
  [types.ADD_OLDER_TOOT] (state, payload) {
    if (helper.checkInvalidObj(payload)) return
    let addTl = payload.timeline
    const type = payload.type

    let stateTl = helper.getMatchingTypeTL(state, type)
    addTl = helper.excludeSameTL(stateTl, addTl)
    stateTl = helper.addTimelineList(stateTl, addTl)
    stateTl = helper.sortToot(stateTl)

    // startIdを最新化
    stateTl.instanceInTimeline.timelineInfoList.forEach(stateInstance => {
      addTl.instanceInTimeline.timelineInfoList.forEach(olderInstance => {
        if (olderInstance.url === stateInstance.url) stateInstance.startId = olderInstance.startId
      })
    })
    helper.commitTimeline(stateTl, type)
  }
}

export default {
  state,
  mutations
}
