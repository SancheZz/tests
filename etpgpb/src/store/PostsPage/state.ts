import type { UserPost, ColorScheme } from './types';

const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';

export interface State {
  theme: ColorScheme;
  posts: UserPost[];
  username: string;
  userPhoto: string;
}

export default {
  theme: localStorage.theme || theme,
  posts: [],
  username: 'John Doe',
  userPhoto: 'https://www.meme-arsenal.com/memes/0fd81b94ebc1b30ef9270edc59a0479d.jpg',
} as State;
