::: details IBookmarkModel

```ts
export interface IBookmarkModel {
  id: number
  author_id: number
  collection_id: number
  name: string
  url: string
  description: string
  icon: string
  created_at: Date

  author?: IUserModel
  collection?: ICollectionModel
  tags?: ITagModel[]
}
```

:::