# Create a new collection

<Api method="post" endpoint="/api/collection" description="Create a collection for the logged-in user." />

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

<!--@include: @reference/schemas/codes/COLLECTION_ALREADY_EXISTS.md-->

<!--@include: @reference/schemas/codes/COLLECTION_CREATE_FAILED.md-->

:::