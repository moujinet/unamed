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

export interface ISessionModel {
  id: number
  user_id: number
  token: string
  expires: number
  created_at: Date

  user?: IUserModel
}

export interface ICollectionModel {
  id: number
  author_id: number
  name: string
  icon: string
  created_at: Date

  author?: IUserModel
  bookmarks?: IBookmarkModel[]
}

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
  tags?: IBookmarksOnTagsModel[]
}

export interface ITagModel {
  id: number
  author_id: number
  name: string

  author?: IUserModel
  bookmarks?: IBookmarksOnTagsModel[]
}

export interface IBookmarksOnTagsModel {
  tag_id: number
  bookmark_id: number
  tag?: ITagModel
  bookmark?: IBookmarkModel
}
