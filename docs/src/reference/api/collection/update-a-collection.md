# Update a collection

<Api method="patch" endpoint="/api/collection/:id" description="Update a collection for the logged-in user." />

## Request

<ApiAuth />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

<div class="parameters">
  <ApiParam
    name="name"
    type="string"
    description="Name of the collection."
    required
  />
  <ApiParam
    name="icon"
    type="string"
    description="Icon of the collection."
    required
  />
</div>

## Response

<ApiSchema />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

<!--@include: @reference/schemas/codes/SUCCESS.md-->

<!--@include: @reference/schemas/codes/COLLECTION_NOT_FOUND.md-->

<!--@include: @reference/schemas/codes/COLLECTION_ALREADY_EXISTS.md-->

<!--@include: @reference/schemas/codes/COLLECTION_UPDATE_FAILED.md-->

:::