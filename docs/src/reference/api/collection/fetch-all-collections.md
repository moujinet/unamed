# Fetch all collections

<Api method="get" endpoint="/api/collections" description="Returns all collections." />

## Request

<ApiAuth />

## Response

<ApiSchema data-type="ICollectionModel[]" />

<!--@include: @models/collection.md-->

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

```json [SUCCESS]
// SUCCESS

{
  "code": "0",
  "data": [
    {
      "id": 1,
      "author_id": 1,
      "name": "Collection name",
      "icon": "icons:nuxt",
      "created_at": "2023-09-08 16:00:00"
    }
  ],
  "message": "Ok"
}
```

:::