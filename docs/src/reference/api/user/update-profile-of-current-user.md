# Update profile of current user

<Api
  method="patch"
  endpoint="/api/user/profile"
  description="Update user profile for the current logged-in user."
/>

## Request

<ApiAuth />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

<div class="parameters">
  <ApiParam
    name="username"
    type="string"
    description="The username of current user."
    required
  />
  <ApiParam
    name="fullname"
    type="string"
    description="The fullname of current user."
  />
</div>

## Response

<ApiSchema />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

<!--@include: @reference/schemas/codes/SUCCESS.md-->

<!--@include: @reference/schemas/codes/USER_ALREADY_EXISTS.md-->

<!--@include: @reference/schemas/codes/USER_UPDATE_FAILED.md-->

:::