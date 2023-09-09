# Delete a tag

<Api method="delete" endpoint="/api/tag/:id" description="Delete a tag for the logged-in user." />

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

<ApiSchema />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

<!--@include: @reference/schemas/codes/SUCCESS.md-->

<!--@include: @reference/schemas/codes/TAG_NOT_FOUND.md-->

<!--@include: @reference/schemas/codes/TAG_DELETE_FAILED.md-->

:::