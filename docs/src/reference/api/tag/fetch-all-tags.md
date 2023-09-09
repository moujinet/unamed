# Fetch all tags

<Api method="get" endpoint="/api/tags" description="Returns all tags." />

## Request

<ApiAuth />

## Response

<ApiSchema data-type="ITagModel[]" />

<!--@include: @models/tag.md-->

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
      "name": "Tag name"
    }
  ],
  "message": "Ok"
}
```

:::