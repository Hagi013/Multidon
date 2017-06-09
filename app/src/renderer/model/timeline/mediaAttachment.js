/**
 * Created by shuhei.hagiwara on 2017/05/03.
 */

export default class MediaAttachment {

  constructor (media) {
    this._id = media.id ? media.id : ''
    this._meta = media.meta ? media.meta : ''
    this._previewUrl = media.preview_url ? media.preview_url : ''
    this._remoteUrl = media.remote_url ? media.remote_url : ''
    this._textUrl = media.text_url ? media.text_url : ''
    this._type = media.type ? media.type : ''
    this._url = media.url ? media.url : ''
  }

  get id () {
    return this._id
  }
  get meta () {
    return this._meta
  }
  get previewUrl () {
    return this._previewUrl
  }
  get remoteUrl () {
    return this._remoteUrl
  }
  get textUrl () {
    return this._textUrl
  }
  get type () {
    return this._type
  }
  get url () {
    return this._url
  }

  set id (target) {
    this._id = target
  }
  set meta (target) {
    this._meta = target
  }
  set previewUrl (target) {
    this._previewUrl = target
  }
  set remoteUrl (target) {
    this._remoteUrl = target
  }
  set textUrl (target) {
    this._textUrl = target
  }
  set type (target) {
    this._type = target
  }
  set url (target) {
    this._url = target
  }
}
