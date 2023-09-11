# Upload avatar image of current user

<Api
  method="post"
  endpoint="/api/user/avatar"
  description="Upload user avatar image for the current logged-in user."
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

<ApiSchema />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

<!--@include: @reference/schemas/codes/SUCCESS.md-->

<!--@include: @reference/schemas/codes/UPLOAD_NO_FILE.md-->

<!--@include: @reference/schemas/codes/UPLOAD_FILE_TYPE_NOT_ALLOW.md-->

:::