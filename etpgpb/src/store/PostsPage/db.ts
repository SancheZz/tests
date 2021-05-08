import type { UserPost, PostComment } from './types';

interface DBPostComment extends PostComment {
  postId: string;
}

const connection = indexedDB.open('posts');

connection.addEventListener('upgradeneeded', function (event: IDBVersionChangeEvent) {
  const connection = event.target as IDBOpenDBRequest;
  const db = connection.result;

  const postsObjectStore = db.createObjectStore('posts', { keyPath: 'id' });
  postsObjectStore.createIndex('id', 'id', { unique: true });
  postsObjectStore.createIndex('date', 'date');
  postsObjectStore.createIndex('message', 'message');
  postsObjectStore.createIndex('username', 'username');
  postsObjectStore.createIndex('userPhoto', 'userPhoto');

  const commentsObjectStore = db.createObjectStore('comments', { keyPath: 'id' });
  commentsObjectStore.createIndex('id', 'id', { unique: true });
  commentsObjectStore.createIndex('username', 'username');
  commentsObjectStore.createIndex('userPhoto', 'userPhoto');
  commentsObjectStore.createIndex('message', 'message');
});

const dbDeferred = new Promise<IDBDatabase>(function (resolve) {
  connection.addEventListener('success', async function (event: Event) {
    const connection = event.target as IDBOpenDBRequest;
    resolve(connection.result);
  });
});

export async function getPosts (): Promise<UserPost[]> {
  const db = await dbDeferred;
  const transaction = db.transaction(['posts', 'comments'], 'readonly');

  const postsRequest: Promise<UserPost[]> = new Promise(function (resolve) {
    const postsObjectStore = transaction.objectStore('posts');
    const request = postsObjectStore.getAll();
    request.addEventListener('success', function (event: Event) {
      const request = event.target as IDBRequest;
      resolve(request.result);
    });
  });

  const commentsRequest: Promise<DBPostComment[]> = new Promise(function (resolve) {
    const commentsObjectStore = transaction.objectStore('comments');
    const request = commentsObjectStore.getAll();
    request.addEventListener('success', function (event: Event) {
      const request = event.target as IDBRequest;
      resolve(request.result);
    });
  });

  const [posts, comments] = await Promise.all([
    postsRequest,
    commentsRequest,
  ]);

  for (const post of posts) {
    for (const comment of comments) {
      if (post.id === comment.postId) {
        post.comments.push(comment);
      }
    }
  }

  posts.sort(function (firstPost, secondPost) {
    return firstPost.date > secondPost.date ? -1 : 1;
  });

  return posts;
}

export async function addPost (tile: UserPost): Promise<boolean> {
  const db = await dbDeferred;
  return new Promise(function (resolve) {
    const transaction = db.transaction('posts', 'readwrite');
    const postsObjectStore = transaction.objectStore('posts');
    const request = postsObjectStore.add(tile);
    request.addEventListener('success', function () {
      resolve(true);
    });
  });
}

export async function addComment (comment: DBPostComment): Promise<boolean> {
  const db = await dbDeferred;
  return new Promise(function (resolve) {
    const transaction = db.transaction('comments', 'readwrite');
    const commentsObjectStore = transaction.objectStore('comments');
    const request = commentsObjectStore.add(comment);
    request.addEventListener('success', function () {
      resolve(true);
    });
  });
}
