import {
  getPosts as getDBPosts,
  addPost as addDBPost,
  addComment as addDBComment,
} from './db';

import {
  generateString,
  generateComment,
} from './utils';

import type { MutationTree } from 'vuex';
import type { State } from './state';
import type { ColorScheme, PostData, PostComment } from './types';

export interface Mutations {
  initPosts (state: State): void;
  setTheme (state: State, theme: ColorScheme): void;
  addPost (state: State, postData: PostData): void;
}

export default {
  async initPosts (state) {
    state.posts = await getDBPosts();
  },

  setTheme (state, theme) {
    state.theme = theme;
    localStorage.theme = theme;
  },

  addPost (state, postData) {
    const post = Object.assign(postData, {
      id: generateString(),
      date: new Date(),
      username: state.username,
      userPhoto: state.userPhoto,
      comments: [] as PostComment[],
    });

    addDBPost(post);

    for (let i = 0; i < 5; i += 1) {
      generateComment()
        .then(comment => {
          post.comments.push(comment);
          addDBComment(Object.assign(comment, {
            postId: post.id,
          }));
        });
    }

    state.posts.unshift(post);
  },
} as Mutations & MutationTree<State>;
