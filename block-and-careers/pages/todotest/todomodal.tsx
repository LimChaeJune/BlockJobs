import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { FaPen } from "react-icons/fa";
import styles from "./todo.module.scss";

interface ProtoTypes {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  modifyContents: string;
  setModifyContents: Dispatch<SetStateAction<string>>;
  onmodifyTodo: () => void;
}

const TodoModal = ({
  setIsModal,
  modifyContents,
  setModifyContents,
  onmodifyTodo,
}: ProtoTypes): JSX.Element => {
  const onCloseModal = useCallback((): void => {
    setIsModal(false);
  }, [setIsModal]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setModifyContents(value);
    },
    [setModifyContents]
  );

  return (
    <>
      <div className={styles.TodoModal_Overlay} onClick={onCloseModal}></div>
      <div className={styles.TodoModal}>
        <div className={styles.TodoModal_Title}>
          <div>Todo 수정하기</div>
          <FaPen />
        </div>

        <div className={styles.TodoModal_Contents}>
          <input
            type={"text"}
            className={styles.TodoModal_Contents_Input}
            value={modifyContents}
            onChange={onChange}
            placeholder="Todo 입력"
          />

          <button
            className={styles.TodoModal_Contents_Button}
            onClick={onmodifyTodo}
          >
            수정하기
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoModal;
