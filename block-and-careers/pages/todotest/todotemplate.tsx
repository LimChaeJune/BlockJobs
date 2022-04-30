import React from "react";
import styles from "./todo.module.scss";
import TodoInput from "./todoInput";
import TodoList from "./todolist";
import TodoTitle from "./todotitle";

const TodoTemplate = (): JSX.Element => {
  return (
    <div className={styles.TodoTemplate}>
      <div className={styles.Contents}>
        <TodoTitle />
        <TodoList />
        <TodoInput />
      </div>
    </div>
  );
};

export default TodoTemplate;
