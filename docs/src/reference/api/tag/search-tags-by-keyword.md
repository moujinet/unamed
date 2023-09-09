# Search tags by keyword

<Api method="post" endpoint="/api/tags" description="Returns the top 5 tags for the given keyword." />

## Request

<ApiAuth />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

<div class="parameters">
  <ApiParam
    name="keyword"
    type="string"
    description="The keyword string. You can search using the tag name."
  />
</div>

## Response

<ApiSchema data-type="ITagModel" />

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
      "name": "Tag name"
    }
  ],
  "message": "Ok"
}
```

:::