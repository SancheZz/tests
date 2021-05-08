import type { PostComment } from './types';

function getRandomArbitrary (min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateString (): string {
  const length = Math.floor(Math.random() * 10);
  return Array.from({ length })
    .map(function () {
      const codePoint = Math.floor(Math.random() * 128) + 127;
      return String.fromCodePoint(codePoint);
    })
    .join('');
}

export function generateComment (): Promise<PostComment> {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve({
        id: generateString(),
        message: generateString(),
        username: generateString(),
        userPhoto: 'https://c.files.bbci.co.uk/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
      });
    }, getRandomArbitrary(5, 30) * 1000);
  });
}
