# Update a tag

<Api method="patch" endpoint="/api/tag/:id" description="Update a tag for the logged-in user." />

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

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

<div class="parameters">
  <ApiParam
    name="name"
    type="string"
    description="Name of the tag."
    required
  />
</div>

## Response

<ApiSchema />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

<!--@include: @reference/schemas/codes/SUCCESS.md-->

<!--@include: @reference/schemas/codes/TAG_NOT_FOUND.md-->

<!--@include: @reference/schemas/codes/TAG_ALREADY_EXISTS.md-->

<!--@include: @reference/schemas/codes/TAG_UPDATE_FAILED.md-->

:::