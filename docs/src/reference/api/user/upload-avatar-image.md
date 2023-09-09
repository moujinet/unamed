# Upload avatar image

<Api
  method="post"
  endpoint="/api/user/avatar"
  description="Returns user profile for the current logged-in user."
/>

## Request

<ApiAuth />

### Body <Badge type="info" text="multipart/form-data" class="float-right mt-1" />

<div class="parameters">
  <ApiParam
    name="file"
    type="string"
    description="File object."
    required
  />
</div>

## Response

<ApiSchema data-type="string" />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

```json [SUCCESS]
{
  "code": "0",
  "data": "/avatars/user-1.png",
  "message": "Ok"
}
```

:::