export interface PostComment {
  id: string;
  username: string;
  userPhoto: string;
  message: string;
}

export interface UserPost {
  id: string;
  date: Date;
  message: string;
  username: string;
  userPhoto: string;
  comments: PostComment[];
}

export type PostData = Omit<UserPost, 'id' | 'username' | 'userPhoto' | 'comments' | 'date'>;

export type ColorScheme = 'light' | 'dark';

export interface PopularItem {
  count: number;
  message: string;
}
