export const getTimelineList = (state, getters) => type => {
  return state.timelines.timelineList.filter(tl => tl.timelineType === type)
}
