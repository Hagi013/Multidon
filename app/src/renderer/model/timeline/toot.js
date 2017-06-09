/**
 * Created by shuhei.hagiwara on 2017/05/03.
 */
import Account from './account'
import MediaAttachment from './mediaAttachment'

export default class Toot {

  constructor (toot) {
    this._id = toot.id ? toot.id : ''
    this._createdAt = toot.created_at ? toot.created_at : ''
    this._inReplyToId = toot.in_reply_to_id ? toot.in_reply_to_id : ''
    this._inReplyToAccountId = toot.in_reply_to_account_id ? toot.in_reply_to_account_id : ''
    this._sensitive = toot.sensitive ? toot.sensitive : ''
    this._spoilerText = toot.spoiler_text ? toot.spoiler_text : ''
    this._visibility = toot.visibility ? toot.visibility : ''
    this._application = toot.application ? toot.application : ''
    this._account = toot.account ? new Account(toot.account) : ''
    this._mediaAttachments = toot.media_attachments ? new MediaAttachment(toot.media_attachments) : ''
    this._mentions = toot.mentions ? toot.mentions : ''
    this._tags = toot.tags ? toot.tags : ''
    this._uri = toot.uri ? toot.uri : ''
    this._content = toot.content ? toot.content : ''
    this._url = toot.url ? toot.url : ''
    this._reblogsCount = toot.reblogs_count ? toot.reblogs_count : ''
    this._favouritesCount = toot.favourites_count ? toot.favourites_count : ''
    this._reblog = toot.reblog ? new Toot(toot.reblog) : ''
    this._favourited = toot.favourited ? toot.favourited : ''
    this._reblogged = toot.reblogged ? toot.reblogged : ''
    this._instanceUrl = toot.instanceUrl ? toot.instanceUrl : ''
    this._viewFlag = true
  }

  get id () {
    return this._id
  }
  get createdAt () {
    return this._createdAt
  }
  get inReplyToId () {
    return this._inReplyToId
  }
  get inReplyToAccountId () {
    return this._inReplyToAccountId
  }
  get sensitive () {
    return this._sensitive
  }
  get spoilerText () {
    return this._spoilerText
  }
  get visibility () {
    return this._visibility
  }
  get application () {
    return this._application
  }
  get account () {
    return this._account
  }
  get mediaAttachments () {
    return this._mediaAttachments
  }
  get mentions () {
    return this._mentions
  }
  get tags () {
    return this._tags
  }
  get uri () {
    return this._uri
  }
  get content () {
    return this._content
  }
  get url () {
    return this._url
  }
  get reblogsCount () {
    return this._reblogsCount
  }
  get favouritesCount () {
    return this._favouritesCount
  }
  get reblog () {
    return this._reblog
  }
  get favourited () {
    return this._favourited
  }
  get reblogged () {
    return this._reblogged
  }
  get instanceUrl () {
    return this._instanceUrl
  }
  get viewFlag () {
    return this._viewFlag
  }

  set id (target) {
    this._id = target
  }
  set createdAt (target) {
    this._createdAt = target
  }
  set inReplyToId (target) {
    this._inReplyToId = target
  }
  set inReplyToAccountId (target) {
    this._inReplyToAccountId = target
  }
  set sensitive (target) {
    this._sensitive = target
  }
  set spoilerText (target) {
    this._spoilerText = target
  }
  set visibility (target) {
    this._visibility = target
  }
  set application (target) {
    this._application = target
  }
  set account (target) {
    this._account = target
  }
  set mediaAttachments (target) {
    this._mediaAttachments = target
  }
  set mentions (target) {
    this._mentions = target
  }
  set tags (target) {
    this._tags = target
  }
  set uri (target) {
    this._uri = target
  }
  set content (target) {
    this._content = target
  }
  set url (target) {
    this._url = target
  }
  set reblogsCount (target) {
    this._reblogsCount = target
  }
  set favouritesCount (target) {
    this._favouritesCount = target
  }
  set reblog (target) {
    this._reblog = target
  }
  set favourited (target) {
    this._favourited = target
  }
  set reblogged (target) {
    this._reblogged = target
  }
  set instanceUrl (target) {
    this._instanceUrl = target
  }
  set viewFlag (target) {
    this._viewFlag = target
  }
}
