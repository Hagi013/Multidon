/**
 * Created by shuhei.hagiwara on 2017/05/03.
 */

export default class Account {

  constructor (account) {
    this._acct = account.acct ? account.acct : ''
    this._avatar = account.avatar ? account.avatar : ''
    this._avatarStatic = account.avatar_static ? account.avatar_static : ''
    this._createdAt = account.created_at ? account.created_at : ''
    this._displayName = account.display_name ? account.display_name : ''
    this._followersCount = account.followers_count ? account.followers_count : ''
    this._followingCount = account.following_count ? account.following_count : ''
    this._header = account.header ? account.header : ''
    this._headerStatic = account.header_static ? account.header_static : ''
    this._id = account.id ? account.id : ''
    this._locked = account.locked ? account.locked : ''
    this._note = account.note ? account.note : ''
    this._oauthAuthentications = account.oauth_authentications ? account.oauth_authentications : ''
    this._statusesCount = account.statuses_count ? account.statuses_count : ''
    this._url = account.url ? account.url : ''
    this._username = account.username ? account.username : ''
  }

  get acct () {
    return this._acct
  }
  get avatar () {
    return this._avatar
  }
  get avatarStatic () {
    return this._avatarStatic
  }
  get createdAt () {
    return this._createdAt
  }
  get displayName () {
    return this._displayName
  }
  get followersCount () {
    return this._followersCount
  }
  get followingCount () {
    return this._followingCount
  }
  get header () {
    return this._header
  }
  get headerStatic () {
    return this._headerStatic
  }
  get id () {
    return this._id
  }
  get locked () {
    return this._locked
  }
  get note () {
    return this._note
  }
  get oauthAuthentications () {
    return this._oauthAuthentications
  }
  get statusesCount () {
    return this._statusesCount
  }
  get url () {
    return this._url
  }
  get username () {
    return this._username
  }

  set acct (target) {
    this._acct = target
  }
  set avatar (target) {
    this._avatar = target
  }
  set avatarStatic (target) {
    this._avatarStatic = target
  }
  set createdAt (target) {
    this._createdAt = target
  }
  set displayName (target) {
    this._displayName = target
  }
  set followersCount (target) {
    this._followersCount = target
  }
  set followingCount (target) {
    this._followingCount = target
  }
  set header (target) {
    this._header = target
  }
  set headerStatic (target) {
    this._headerStatic = target
  }
  set id (target) {
    this._id = target
  }
  set locked (target) {
    this._locked = target
  }
  set note (target) {
    this._note = target
  }
  set oauthAuthentications (target) {
    this._oauthAuthentications = target
  }
  set statusesCount (target) {
    this._statusesCount = target
  }
  set url (target) {
    this._url = target
  }
  set username (target) {
    this._username = target
  }
}
