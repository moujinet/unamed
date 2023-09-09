# Fetch metadata of a bookmark url

<Api
  method="post"
  endpoint="/api/bookmark/metadata"
  description="Returns link metadata for the given URL."
/>

- name: `og:site_name` > `og:title` > `twitter:title` > `title`
- description `ob:description` > `twitter:description` > `description`
- icon: `apple-touch-icon` > `alternate icon` > `icon` > `favicon.ico`

## Request

<ApiAuth />

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

<div class="parameters">
  <ApiParam
    name="url"
    type="string"
    description="The Link URL."
  />
</div>

## Response

<ApiSchema data-type="IBookmarkModel[]" />

<!--@include: @models/metadata.md-->

### Body <Badge type="info" text="application/json" class="float-right mt-1" />

::: code-group

```json [SUCCESS]
{
  "code": "0",
  "data": {
    "name": "Title",
    "description": "Description",
    "icon": "http://www.domain.com/favicon.ico"
  },
  "message": "Ok"
}
```

:::