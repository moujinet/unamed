::: details ICollectionModel

```ts
export interface ICollectionModel {
  id: number
  author_id: number
  name: string
  icon: string
  created_at: Date

  author?: IUserModel
  bookmarks?: IBookmarkModel[]
}
```

:::