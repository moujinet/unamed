# Fetch details of a collection

<Api method="get" endpoint="/api/collection/:id" description="Returns a collection details for the given collection ID." />

## Request

<ApiAuth />

### Router Params

<div class="parameters">
  <ApiParam
    name="id"
    type="number"
    description="ID of the collection."
    required
  />
</div>

## Response

<ApiSchema data-type="ICollectionModel" />

<!--@include: @models/collection.md-->

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

```json [SUCCESS]
// SUCCESS

{
  "code": "0",
  "data": {
    "id": 1,
    "author_id": 1,
    "name": "Collection name",
    "icon": "icons:nuxt",
    "created_at": "2023-09-08 16:00:00"
  },
  "message": "Ok"
}
```

<!--@include: @reference/schemas/codes/COLLECTION_NOT_FOUND.md-->

:::