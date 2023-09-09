# Login a user

<Api
  method="post"
  endpoint="/api/user/login"
  description="Registered users can login using the API described below."
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
</div>

## Response

<ApiSchema data-type="{ token: string }" />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

```json [SUCCESS]
{
  "code": "0",
  "data": {
    "token": "TOKEN STRING"
  },
  "message": "Ok"
}
```

<!--@include: @reference/schemas/codes/USER_NOT_FOUND.md-->

<!--@include: @reference/schemas/codes/USER_PASSWORD_NOT_MATCH.md-->

<!--@include: @reference/schemas/codes/USER_LOGIN_FAILED.md-->

:::