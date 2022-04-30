import React, { useCallback, useState } from "react";
import { ITodoTypes } from "../../states/todo";
import { SetterOrUpdater } from "recoil";
import styles from "./todo.module.scss";
import { FaPen } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import TodoModal from "./todomodal";

interface MyType {
  id: number;
  contents: string;
  isCompleted: boolean;

  onComplete: (id: number) => void;
  onDelete: (id: number) => void;

  todos: ITodoTypes[];
  setTodos: SetterOrUpdater<ITodoTypes[]>;
}

const TodoItem = ({
  id,
  contents,
  isCompleted,
  onComplete,
  onDelete,
  todos,
  setTodos,
}: MyType): JSX.Element => {
  const [isModal, setIsModal] = useState<boolean>(true);
  const [modifiyContents, setModifyContents] = useState<string>("");

  const onModifiy = useCallback((): void => {
    setIsModal(true);
    setModifyContents(contents);
  }, [contents]);

  const onModifyTodo = useCallback((): void => {
    if (!modifiyContents.trim()) {
      return;
    }

    setTodos(
      todos.map((todo: ITodoTypes) => {
        return todo.id === id ? { ...todo, contents: modifiyContents } : todo;
      })
    );

    setIsModal(true);
  }, [id, modifiyContents, setTodos, todos]);

  return (
    <>
      <div className={styles.TodoItem}>
        <div
          title={contents}
          className={isCompleted ? styles.TodoItem_Completed : ""}
          onClick={() => onComplete(id)}
        >
          {contents}
        </div>

        <div className={styles.TodoItem_Icons}>
          <FaPen className={styles.TodoItem_Icons_Pen} onClick={onModifiy} />
          <MdClose
            className={styles.TodoItem_Icons_Close}
            onClick={() => onDelete(id)}
          />
        </div>
      </div>
      {isModal && (
        <TodoModal
          setIsModal={setIsModal}
          setModifyContents={setModifyContents}
          modifyContents={modifiyContents}
          onmodifyTodo={onModifyTodo}
        />
      )}
    </>
  );
};

export default TodoItem;
