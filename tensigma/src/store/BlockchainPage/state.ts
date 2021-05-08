interface FromAddr {
  [element: string]: {
    [element: string]: number;
  };
}

export interface State {
  subscribed: boolean;
  transactions: FromAddr;
}

export default {
  subscribed: false,
  transactions: {},
} as State;
