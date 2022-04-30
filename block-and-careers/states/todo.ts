import { atom } from "recoil";

export interface ITodoTypes {
  id: number;
  contents: string;
  isCompleted: boolean;
}

export const inputState = atom<string>({
  key: "inputState",
  default: "",
});

export const todosState = atom<ITodoTypes[]>({
  key: "todos",

  default: [
    { id: 1, contents: "test1", isCompleted: false },
    { id: 2, contents: "test2", isCompleted: false },
    { id: 3, contents: "test3", isCompleted: false },
  ],
});
