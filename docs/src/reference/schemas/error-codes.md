# Error Codes

## User `1xx`

<div class="parameters">
  <ApiParam
    name="101"
    type="USER_NOT_FOUND"
    description="User not found"
  />
  <ApiParam
    name="102"
    type="USER_ALREADY_EXISTS"
    description="User already exists"
  />
  <ApiParam
    name="103"
    type="USER_PASSWORD_NOT_MATCH"
    description="User password do not match"
  />
  <ApiParam
    name="104"
    type="USER_PASSWORD_NOT_SAME_TWICE"
    description="User passwords are not the same twice"
  />
  <ApiParam
    name="105"
    type="USER_CREATE_FAILED"
    description="User register failed"
  />
  <ApiParam
    name="106"
    type="USER_UPDATE_FAILED"
    description="User update failed"
  />
  <ApiParam
    name="107"
    type="USER_DELETE_FAILED"
    description="User delete failed"
  />
  <ApiParam
    name="108"
    type="USER_LOGIN_FAILED"
    description="User login failed"
  />
</div>

## Bookmark `2xx`

<div class="parameters">
  <ApiParam
    name="201"
    type="BOOKMARK_NOT_FOUND"
    description="Bookmark not found"
  />
  <ApiParam
    name="202"
    type="BOOKMARK_ALREADY_EXISTS"
    description="Bookmark already exists"
  />
  <ApiParam
    name="203"
    type="BOOKMARK_CREATE_FAILED"
    description="Bookmark create failed"
  />
  <ApiParam
    name="204"
    type="BOOKMARK_UPDATE_FAILED"
    description="Bookmark update failed"
  />
  <ApiParam
    name="205"
    type="BOOKMARK_DELETE_FAILED"
    description="Bookmark delete failed"
  />
</div>

## Collection `3xx`

<div class="parameters">
  <ApiParam
    name="301"
    type="COLLECTION_NOT_FOUND"
    description="Collection not found"
  />
  <ApiParam
    name="302"
    type="COLLECTION_ALREADY_EXISTS"
    description="Collection already exists"
  />
  <ApiParam
    name="303"
    type="COLLECTION_CREATE_FAILED"
    description="Collection create failed"
  />
  <ApiParam
    name="304"
    type="COLLECTION_UPDATE_FAILED"
    description="Collection update failed"
  />
  <ApiParam
    name="305"
    type="COLLECTION_DELETE_FAILED"
    description="Collection delete failed"
  />
  <ApiParam
    name="306"
    type="COLLECTION_HAS_BOOKMARKS"
    description="Collection has bookmarks"
  />
</div>

## Tag `4xx`

<div class="parameters">
  <ApiParam
    name="401"
    type="TAG_NOT_FOUND"
    description="Tag not found"
  />
  <ApiParam
    name="402"
    type="TAG_ALREADY_EXISTS"
    description="Tag already exists"
  />
  <ApiParam
    name="403"
    type="TAG_CREATE_FAILED"
    description="Tag create failed"
  />
  <ApiParam
    name="404"
    type="TAG_UPDATE_FAILED"
    description="Tag update failed"
  />
  <ApiParam
    name="405"
    type="TAG_DELETE_FAILED"
    description="Tag delete failed"
  />
  <ApiParam
    name="406"
    type="TAG_HAS_BOOKMARKS"
    description="Tag has bookmarks"
  />
</div>

## Upload `5xx`

<div class="parameters">
  <ApiParam
    name="501"
    type="UPLOAD_NO_FILE"
    description="Upload no file"
  />
  <ApiParam
    name="502"
    type="UPLOAD_FILE_TYPE_NOT_ALLOW"
    description="Upload file type not allow"
  />
</div>

## Common

<div class="parameters">
  <ApiParam
    name="0"
    type="SUCCESS"
    description="Ok"
  />
  <ApiParam
    name="1"
    type="FAILED"
    description="Failed"
  />
</div>