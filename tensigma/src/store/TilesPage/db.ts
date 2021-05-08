import type { InfoTile } from './types';

const connection = indexedDB.open('tiles');

connection.addEventListener('upgradeneeded', function (event: IDBVersionChangeEvent) {
  const connection = event.target as IDBOpenDBRequest;
  const db = connection.result;

  const objectStore = db.createObjectStore('tiles', { keyPath: 'id' });
  objectStore.createIndex('id', 'id', { unique: true });
  objectStore.createIndex('top', 'top');
  objectStore.createIndex('left', 'left');
  objectStore.createIndex('width', 'width');
  objectStore.createIndex('height', 'height');
  objectStore.createIndex('removed', 'removed');
});

const dbDeferred = new Promise<IDBDatabase>(function (resolve) {
  connection.addEventListener('success', async function (event: Event) {
    const connection = event.target as IDBOpenDBRequest;
    resolve(connection.result);
  });
});

export async function getTiles (): Promise<InfoTile[]> {
  const db = await dbDeferred;
  return new Promise(function (resolve) {
    const transaction = db.transaction('tiles', 'readonly');
    const objectStore = transaction.objectStore('tiles');
    const request = objectStore.getAll();
    request.addEventListener('success', function (event: Event) {
      const request = event.target as IDBRequest;
      resolve(request.result as InfoTile[]);
    });
  });
}

export async function setTile (tile: InfoTile): Promise<boolean> {
  const db = await dbDeferred;
  return new Promise(function (resolve) {
    const transaction = db.transaction('tiles', 'readwrite');
    const objectStore = transaction.objectStore('tiles');
    const request = objectStore.put(tile);
    request.addEventListener('success', function () {
      resolve(true);
    });
  });
}
