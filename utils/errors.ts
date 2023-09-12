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
  [SUCCESS]: 'Ok',
  [FAILED]: 'Failed',

  [USER_NOT_FOUND]: 'User is not exists',
  [USER_ALREADY_EXISTS]: 'User already exists',
  [USER_PASSWORD_NOT_MATCH]: 'User password do not match',
  [USER_PASSWORD_NOT_SAME_TWICE]: 'User passwords are not the same twice',
  [USER_CREATE_FAILED]: 'User registration failed',
  [USER_UPDATE_FAILED]: 'User profile update failed',
  [USER_LOGIN_FAILED]: 'User login failed',

  [COLLECTION_NOT_FOUND]: 'Collection not found',
  [COLLECTION_ALREADY_EXISTS]: 'Collection already exists',
  [COLLECTION_CREATE_FAILED]: 'Collection create failed',
  [COLLECTION_UPDATE_FAILED]: 'Collection update failed',
  [COLLECTION_DELETE_FAILED]: 'Collection delete failed',
  [COLLECTION_HAS_BOOKMARKS]: 'Collection has bookmarks',

  [BOOKMARK_NOT_FOUND]: 'Bookmark not found',
  [BOOKMARK_ALREADY_EXISTS]: 'Bookmark already exists',
  [BOOKMARK_CREATE_FAILED]: 'Bookmark create failed',
  [BOOKMARK_UPDATE_FAILED]: 'Bookmark update failed',
  [BOOKMARK_DELETE_FAILED]: 'Bookmark delete failed',
  [BOOKMARK_URL_REQUIRED]: 'Bookmark url is required',

  [TAG_NOT_FOUND]: 'Tag not found',
  [TAG_ALREADY_EXISTS]: 'Tag already exists',
  [TAG_CREATE_FAILED]: 'Tag create failed',
  [TAG_UPDATE_FAILED]: 'Tag update failed',
  [TAG_DELETE_FAILED]: 'Tag delete failed',
  [TAG_HAS_BOOKMARKS]: 'Tag has bookmarks',

  [UPLOAD_NO_FILE]: 'Upload no file',
  [UPLOAD_FILE_TYPE_NOT_ALLOW]: 'Upload file type not allow',
}

export type ErrorCode = keyof typeof errorMessages

export function getErrorMessage(code: ErrorCode) {
  return errorMessages[code]
}
