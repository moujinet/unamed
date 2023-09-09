::: details IUserModel

```ts
export interface IUserModel {
  id: number
  username: string
  password: string
  fullname: string | null
  avatar: string | null
  is_admin: boolean
  created_at: Date

  bookmarks?: IBookmarkModel[]
  collections?: ICollectionModel[]
  tags?: ITagModel[]
}
```

:::