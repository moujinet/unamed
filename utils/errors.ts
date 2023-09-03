export const SUCCESS = '0'
export const FAILED = '1'

export const USER_NOT_FOUND = '101'
export const USER_ALREADY_EXISTS = '102'
export const USER_PASSWORD_NOT_MATCH = '103'
export const USER_PASSWORD_NOT_SAME = '104'
export const USER_CREATE_FAILED = '105'
export const USER_UPDATE_FAILED = '106'
export const USER_LOGIN_FAILED = '107'
export const USER_DELETE_FAILED = '108'

export const COLLECTION_NOT_FOUND = '201'
export const COLLECTION_ALREADY_EXISTS = '202'
export const COLLECTION_CREATE_FAILED = '203'
export const COLLECTION_UPDATE_FAILED = '204'
export const COLLECTION_DELETE_FAILED = '205'
export const COLLECTION_HAS_BOOKMARKS = '206'

export const BOOKMARK_NOT_FOUND = '301'
export const BOOKMARK_ALREADY_EXISTS = '302'
export const BOOKMARK_CREATE_FAILED = '303'
export const BOOKMARK_UPDATE_FAILED = '304'
export const BOOKMARK_DELETE_FAILED = '305'

export const TAG_NOT_FOUND = '401'
export const TAG_ALREADY_EXISTS = '402'
export const TAG_CREATE_FAILED = '403'
export const TAG_UPDATE_FAILED = '404'
export const TAG_DELETE_FAILED = '405'

export const UPLOAD_NO_FILES = '500'
export const UPLOAD_FILE_TYPE_NO_SUPPORT = '501'

/**
 * Error message
 *
 * - 101 - Username is not exists
 * - 102 - Username already exists
 * - 103 - Password is not match
 * - 104 - Password is not same
 * - 105 - User registration failed
 * - 106 - User profile is not exists
 * - 107 - User profile update failed
 * - 108 - User login failed
 * - 201 - Collection not found
 * - 202 - Collection name already exists
 * - 203 - Collection create failed
 * - 204 - Collection icon is required
 * - 205 - Collection update failed
 * - 206 - Collection name is required
 * - 301 - Bookmark not found
 * - 302 - Bookmark already exists
 * - 303 - Bookmark create failed
 * - 304 - Bookmark update failed
 * - 305 - Bookmark delete failed
 * - 401 - Tag not found
 * - 402 - Tag already exists
 * - 403 - Tag create failed
 * - 404 - Tag update failed
 * - 405 - Tag delete failed
 * - 500 - Upload no files
 * - 501 - Upload file type no support
 */
const errorMessages = {
  [SUCCESS]: 'Ok',
  [FAILED]: 'Failed',

  [USER_NOT_FOUND]: 'Username is not exists',
  [USER_ALREADY_EXISTS]: 'Username already exists',
  [USER_PASSWORD_NOT_MATCH]: 'Password is not match',
  [USER_PASSWORD_NOT_SAME]: 'Password is not same',
  [USER_CREATE_FAILED]: 'User registration failed',
  [USER_UPDATE_FAILED]: 'User profile update failed',
  [USER_LOGIN_FAILED]: 'User login failed',
  [USER_DELETE_FAILED]: 'User delete failed',

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

  [TAG_NOT_FOUND]: 'Tag not found',
  [TAG_ALREADY_EXISTS]: 'Tag already exists',
  [TAG_CREATE_FAILED]: 'Tag create failed',
  [TAG_UPDATE_FAILED]: 'Tag update failed',
  [TAG_DELETE_FAILED]: 'Tag delete failed',

  [UPLOAD_NO_FILES]: 'Upload no files',
  [UPLOAD_FILE_TYPE_NO_SUPPORT]: 'Upload file type no support',
}

export type ErrorCode = keyof typeof errorMessages

export function getErrorMessage(code: ErrorCode) {
  return errorMessages[code]
}
