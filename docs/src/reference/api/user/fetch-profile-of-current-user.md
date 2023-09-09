# Fetch profile of current user

<Api
  method="get"
  endpoint="/api/user/profile"
  description="Returns user profile for the current logged-in user."
/>

## Request

<ApiAuth />

## Response

<ApiSchema data-type="IUserModel" />

<!--@include: @models/user.md-->

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

```json [SUCCESS]
{
  "code": "0",
  "data": {
    "id": 1,
    "username": "Username",
    "fullname": "Fullname",
    "avatar": "/avatars/user-1.png",
    "is_admin": false,
    "created_at": "2023-09-08 16:00:00"
  },
  "message": "Ok"
}
```

:::