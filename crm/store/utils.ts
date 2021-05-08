type Func = (...args: any[]) => any;

type Funcs = {
  [element: string]: Func,
}

export type GetPayload <
  StoreFunc extends Func,
  Position extends number = 0,
> = Parameters<StoreFunc>[Position] extends undefined
  ? void
  : Parameters<StoreFunc>[Position];

export type Module <
  State,
  Getters,
  Mutations extends Funcs,
  Actions extends Funcs,
> = {
  state: State,
  getters: Getters,

  commit <
    MutationName extends keyof Mutations,
  > (
    name: MutationName,
    payload: GetPayload<Mutations[MutationName], 1>,
  ): void;

  dispatch <
    ActionName extends keyof Actions,
  > (
    name: ActionName,
    payload: GetPayload<Actions[ActionName], 1>,
  ): ReturnType<Actions[ActionName]>;
};
