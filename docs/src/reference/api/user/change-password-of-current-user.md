# Change password of current user

<Api
  method="patch"
  endpoint="/api/user/password"
  description="Change user password for the current logged-in user."
/>

## Request

<ApiAuth />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

<div class="parameters">
  <ApiParam
    name="password"
    type="string"
    description="The password of the current logged-in user."
    required
  />
  <ApiParam
    name="newPassword"
    type="string"
    description="The new password."
    required
  />
  <ApiParam
    name="newPasswordConfirm"
    type="string"
    description="The confirm password."
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