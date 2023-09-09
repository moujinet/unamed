# Register a new user

<Api
  method="post"
  endpoint="/api/user/register"
  description="Register a new user."
/>

## Request

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

<div class="parameters">
  <ApiParam
    name="username"
    type="string"
    description="The username."
  />
  <ApiParam
    name="password"
    type="string"
    description="The password, encrypted with SHA256 and converted to lower case."
  />
  <ApiParam
    name="passwordConfirm"
    type="string"
    description="The confirm password."
  />
</div>

## Response

<ApiSchema />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

<!--@include: @reference/schemas/codes/SUCCESS.md-->

<!--@include: @reference/schemas/codes/USER_ALREADY_EXISTS.md-->

<!--@include: @reference/schemas/codes/USER_PASSWORD_NOT_SAME_TWICE.md-->

<!--@include: @reference/schemas/codes/USER_CREATE_FAILED.md-->

:::