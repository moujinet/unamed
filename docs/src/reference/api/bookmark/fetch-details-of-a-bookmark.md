# Fetch details of a bookmark

<Api method="get" endpoint="/api/bookmark/:id" description="Returns a bookmark details for the given bookmark ID." />

## Request

<ApiAuth />

### Router Params

<div class="parameters">
  <ApiParam
    name="id"
    type="number"
    description="ID of the bookmark."
    required
  />
</div>

## Response

<ApiSchema data-type="IBookmarkModel" />

<!--@include: @models/bookmark.md-->

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

```json [SUCCESS]
{
  "code": "0",
  "data": {
    "id": 1,
    "name": "Bookmark",
    "description": "Description",
    "url": "http://www.domain.com",
    "icon": "http://www.domain.com/icon.png",
    "collection_id": 1,
    "collection": {
      "id": 1,
      "name": "Collection name"
    },
    "author_id": 1,
    "author": {
      "id": 1,
      "username": "Username",
      "fullname": "Fullname"
    },
    "tags": [
      {
        "id": 1,
        "name": "Tag 1"
      }
    ],
    "created_at": "2023-09-08 16:00:00"
  },
  "message": "Ok"
}
```

<!--@include: @reference/schemas/codes/BOOKMARK_NOT_FOUND.md-->

:::