::: details ITagModel

```ts
export interface ITagModel {
  id: number
  author_id: number
  name: string

  author?: IUserModel
  bookmarks?: IBookmarkModel[]
}
```

:::