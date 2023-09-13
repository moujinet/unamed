export const SUCCESS = '0'
export const FAILED = '1'

export const USER_NOT_FOUND = '101'
export const USER_ALREADY_EXISTS = '102'
export const USER_PASSWORD_NOT_MATCH = '103'
export const USER_PASSWORD_NOT_SAME_TWICE = '104'
export const USER_CREATE_FAILED = '105'
export const USER_UPDATE_FAILED = '106'
export const USER_LOGIN_FAILED = '107'

export const BOOKMARK_NOT_FOUND = '201'
export const BOOKMARK_ALREADY_EXISTS = '202'
export const BOOKMARK_CREATE_FAILED = '203'
export const BOOKMARK_UPDATE_FAILED = '204'
export const BOOKMARK_DELETE_FAILED = '205'
export const BOOKMARK_URL_REQUIRED = '206'

export const COLLECTION_NOT_FOUND = '301'
export const COLLECTION_ALREADY_EXISTS = '302'
export const COLLECTION_CREATE_FAILED = '303'
export const COLLECTION_UPDATE_FAILED = '304'
export const COLLECTION_DELETE_FAILED = '305'
export const COLLECTION_HAS_BOOKMARKS = '306'

export const TAG_NOT_FOUND = '401'
export const TAG_ALREADY_EXISTS = '402'
export const TAG_CREATE_FAILED = '403'
export const TAG_UPDATE_FAILED = '404'
export const TAG_DELETE_FAILED = '405'
export const TAG_HAS_BOOKMARKS = '406'

export const UPLOAD_NO_FILE = '501'
export const UPLOAD_FILE_TYPE_NOT_ALLOW = '502'

const errorMessages = {
  [SUCCESS]: 'errors.ok',
  [FAILED]: 'errors.failed',

  [USER_NOT_FOUND]: 'errors.user.is-not-exists',
  [USER_ALREADY_EXISTS]: 'errors.user.already-exists',
  [USER_PASSWORD_NOT_MATCH]: 'errors.user.password-do-not-match',
  [USER_PASSWORD_NOT_SAME_TWICE]: 'errors.user.passwords-are-not-the-same-twice',
  [USER_CREATE_FAILED]: 'errors.user.registration-failed',
  [USER_UPDATE_FAILED]: 'errors.user.profile-update-failed',
  [USER_LOGIN_FAILED]: 'errors.user.login-failed',

  [COLLECTION_NOT_FOUND]: 'errors.collection.not-found',
  [COLLECTION_ALREADY_EXISTS]: 'errors.collection.already-exists',
  [COLLECTION_CREATE_FAILED]: 'errors.collection.create-failed',
  [COLLECTION_UPDATE_FAILED]: 'errors.collection.update-failed',
  [COLLECTION_DELETE_FAILED]: 'errors.collection.delete-failed',
  [COLLECTION_HAS_BOOKMARKS]: 'errors.collection.has-bookmarks',

  [BOOKMARK_NOT_FOUND]: 'errors.bookmark.not-found',
  [BOOKMARK_ALREADY_EXISTS]: 'errors.bookmark.already-exists',
  [BOOKMARK_CREATE_FAILED]: 'errors.bookmark.create-failed',
  [BOOKMARK_UPDATE_FAILED]: 'errors.bookmark.update-failed',
  [BOOKMARK_DELETE_FAILED]: 'errors.bookmark.delete-failed',
  [BOOKMARK_URL_REQUIRED]: 'errors.bookmark.url-is-required',

  [TAG_NOT_FOUND]: 'errors.tag.not-found',
  [TAG_ALREADY_EXISTS]: 'errors.tag.already-exists',
  [TAG_CREATE_FAILED]: 'errors.tag.create-failed',
  [TAG_UPDATE_FAILED]: 'errors.tag.update-failed',
  [TAG_DELETE_FAILED]: 'errors.tag.delete-failed',
  [TAG_HAS_BOOKMARKS]: 'errors.tag.has-bookmarks',

  [UPLOAD_NO_FILE]: 'errors.upload.no-file',
  [UPLOAD_FILE_TYPE_NOT_ALLOW]: 'errors.upload.file-type-not-allow',
}

export type ErrorCode = keyof typeof errorMessages

export function getErrorMessage(code: ErrorCode) {
  return errorMessages[code]
}
