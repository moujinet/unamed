# Delete a bookmark

<Api method="delete" endpoint="/api/bookmark/:id" description="Delete a bookmark for the logged-in user." />

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

<ApiSchema />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

<!--@include: @reference/schemas/codes/SUCCESS.md-->

<!--@include: @reference/schemas/codes/BOOKMARK_NOT_FOUND.md-->

<!--@include: @reference/schemas/codes/BOOKMARK_DELETE_FAILED.md-->

:::