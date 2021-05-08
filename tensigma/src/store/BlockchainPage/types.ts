interface TransactionData {
  addr: string;
  value: number;
}

export interface TransactionInfo {
  inputs: {
    prev_out: TransactionData;
  }[];

  out: TransactionData[];
}
