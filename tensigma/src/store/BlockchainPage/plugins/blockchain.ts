import type { AppMutations } from '@/store';

interface SubscribedMutation {
  type: keyof AppMutations;
}

const socket = new WebSocket('wss://ws.blockchain.info/inv');
const bufferedMessages: string[] = [];

socket.addEventListener('open', function () {
  bufferedMessages.forEach(socket.send.bind(socket));
}, { once: true });

function send (data: object): void {
  const message = JSON.stringify(data);
  if (socket.readyState === 1) {
    socket.send(message);
  } else {
    bufferedMessages.push(message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (store: any): void {
  socket.addEventListener('message', function (event: MessageEvent) {
    const message = JSON.parse(event.data);
    store.commit('BlockchainPage/setTransactions', message.x);
  });

  store.subscribe(function (mutation: SubscribedMutation) {
    if (mutation.type === 'BlockchainPage/subscribe') {
      send({ op: 'unconfirmed_sub' });
    }
  });

  store.subscribe(function (mutation: SubscribedMutation) {
    if (mutation.type === 'BlockchainPage/unsubscribe') {
      send({ op: 'unconfirmed_unsub' });
    }
  });
}
