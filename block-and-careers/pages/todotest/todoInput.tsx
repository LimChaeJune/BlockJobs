import React, { useCallback, ChangeEvent, KeyboardEvent } from "react";
import { FaPen } from "react-icons/fa";
import styles from "./todo.module.scss";
import { useRecoilState } from "recoil";
import { inputState, todosState, ITodoTypes } from "../../states/todo";

const TodoInput = (): JSX.Element => {
  const [contents, setContents] = useRecoilState<string>(inputState);
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todosState);

  const addTodo = useCallback((): void => {
    if (!contents.trim()) {
      return;
    }

    const nextId: number =
      todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;

    const todo: ITodoTypes = {
      id: nextId,
      contents,
      isCompleted: false,
    };

    setTodos([...todos, todo]);

    setContents("");
  }, [contents, setContents, todos, setTodos]);

  const OnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setContents(value);
    },
    [setContents]
  );

  const OnKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        addTodo();
      }
    },
    [addTodo]
  );

  return (
    <div className={styles.TodoInput}>
      <input
        type="text"
        className={styles.TodoInput_Input}
        placeholder="Todo 입력"
        value={contents}
        onChange={OnChange}
        onKeyDown={OnKeyDown}
      ></input>
      <FaPen onClick={addTodo} className={styles.TodoInput_Button} />
    </div>
  );
};

export default TodoInput;
