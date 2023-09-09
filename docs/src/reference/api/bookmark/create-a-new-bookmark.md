# Create a new bookmark

<Api method="post" endpoint="/api/bookmark" description="Create a bookmark for the logged-in user." />

## Request

<ApiAuth />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

<div class="parameters">
  <ApiParam
    name="collection_id"
    type="number"
    description="ID of the collection."
    required
  />
  <ApiParam
    name="name"
    type="string"
    description="Name of the bookmark."
    required
  />
  <ApiParam
    name="url"
    type="string"
    description="Url of the bookmark."
    required
  />
  <ApiParam
    name="description"
    type="string"
    description="Description of the bookmark."
  />
  <ApiParam
    name="icon"
    type="string"
    description="Icon of the bookmark."
  />
  <ApiParam
    name="tags"
    type="string[]"
    description="Tags of the bookmark."
  />
</div>

## Response

<ApiSchema />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

<!--@include: @reference/schemas/codes/SUCCESS.md-->

<!--@include: @reference/schemas/codes/BOOKMARK_ALREADY_EXISTS.md-->

<!--@include: @reference/schemas/codes/BOOKMARK_CREATE_FAILED.md-->

:::
