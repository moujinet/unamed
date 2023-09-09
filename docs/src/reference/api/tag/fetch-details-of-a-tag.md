# Fetch details of a tag

<Api method="get" endpoint="/api/tag/:id" description="Returns a tag details for the given tag ID." />

## Request

<ApiAuth />

### Router Params

<div class="parameters">
  <ApiParam
    name="id"
    type="number"
    description="ID of the tag."
    required
  />
</div>

## Response

<ApiSchema data-type="ITagModel[]" />

<!--@include: @models/tag.md-->

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

```json [SUCCESS]
// SUCCESS

{
  "code": "0",
  "data": {
    "id": 1,
    "author_id": 1,
    "name": "Tag name"
  },
  "message": "Ok"
}
```

<!--@include: @reference/schemas/codes/TAG_NOT_FOUND.md-->

:::