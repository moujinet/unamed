# Update avatar of current user

<Api
  method="patch"
  endpoint="/api/user/avatar"
  description="Update user avatar for the current logged-in user."
/>

## Request

<ApiAuth />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

<div class="parameters">
  <ApiParam
    name="avatar"
    type="string"
    description="The avatar of current user."
    required
  />
</div>

## Response

<ApiSchema />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

<!--@include: @reference/schemas/codes/SUCCESS.md-->

<!--@include: @reference/schemas/codes/USER_UPDATE_FAILED.md-->

:::