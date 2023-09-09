# Fetch all bookmarks

<Api
  method="get"
  endpoint="/api/bookmarks/[:id]"
  description="Returns all bookmarks for a Collection. If the [:id] parameter is passed, returns all bookmarks for the given Collection ID."
/>

## Request

### Router Params

<div class="parameters">
  <ApiParam
    name="id"
    type="number"
    description="ID of the collection."
    default-value="undefined"
    required
  />
</div>

### Query Strings

<div class="parameters">
  <ApiParam
    name="search"
    type="string"
    description="The search query string. You can search using the bookmark name or url."
  />
  <ApiParam
    name="page"
    type="number"
    description="The page number from which you want your page search results to be displayed."
    default-value="1"
  />
  <ApiParam
    name="per_page"
    type="number"
    description="Number of results per page."
    default-value="20"
  />
</div>

## Response

<ApiSchema data-type="IBookmarkModel[]" />

<!--@include: @models/bookmark.md-->

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

```json [SUCCESS]
{
  "code": "0",
  "data": {
    "total": 1,
    "page": 1,
    "per_page": 20,
    "list": [
      {
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
      }
    ]
  },
  "message": "Ok"
}
```

:::