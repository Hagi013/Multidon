import * as types from './mutation-types'
import Mastodon from '../model/mastodon'
import Timeline from '../model/timeline/timeline'

const timelinesFromMstdn = async (type) => {
  const Ms = new Mastodon(60 * 1000)
  if (type === 'Home') return await Ms.fetchHomeTimelines()
  if (type === 'Public') return await Ms.fetchPublicTimelines()
  if (type === 'Local') return await Ms.fetchLocalTimelines()
}

const timelinesOlderFromMstdn = async (type, startObjList) => {
  const Ms = new Mastodon(60 * 1000)
  if (type === 'Home') return await Ms.fetchOlderHomeTimelines(startObjList)
  if (type === 'Public') return await Ms.fetchOlderPublicTimelines(startObjList)
  if (type === 'Local') return await Ms.fetchOlderLocalTimelines(startObjList)
}

export const fetchTimelines = async ({ commit }, type) => {
  const results = await timelinesFromMstdn(type)
  const timeline = new Timeline(type, results)
  commit(types.ADD_TIMELINE, timeline)
}

export const fetchLatestTimelines = async ({ commit }, type) => {
  const results = await timelinesFromMstdn(type)
  const payload = {
    timeline: new Timeline(type, results),
    type: type
  }
  commit(types.ADD_LATEST_TOOT, payload)
}

export const fetchOldTimelines = async ({ commit, getters }, type) => {
  const currentTL = getters.getTimelineList(type)
  // こいつをクラス化したい
  let startObjList = []
  console.log('aaaa', currentTL[0].instanceInTimeline.timelineInfoList)
  currentTL[0].instanceInTimeline.timelineInfoList.map(instance => {
    startObjList.push({
      url: instance.url,
      startId: instance.startId
    })
  })
  const results = await timelinesOlderFromMstdn(type, startObjList)
  const payload = {
    timeline: new Timeline(type, results),
    type: type
  }
  commit(types.ADD_OLDER_TOOT, payload)
}

export const addTimeline = ({ commit }, timeline) => {
  commit(types.ADD_TIMELINE, timeline)
}

export const mutateTootVisibility = ({ commit }, payload) => {
  commit(types.MUTATE_VISIBILITY, payload)
}
