export interface IUserModel {
  id: number
  username: string
  password: string
  fullname: string | null
  avatar: string | null
  is_admin: boolean
  created_at: Date
}

export interface ISessionModel {
  id: number
  user_id: number
  token: string
  expires: number
  created_at: Date
}

export interface ICollectionModel {
  id: number
  author_id: number
  name: string
  icon: string
  created_at: Date
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
}

export interface ITagModel {
  id: number
  name: string
}
