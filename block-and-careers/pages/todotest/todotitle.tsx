import React from "react";
import { GiWireCoil } from 'react-icons/gi';
import styles from './todo.module.scss';

const TodoTitle = (): JSX.Element => {
    return(
        <div className={styles.TodoTitle}>
            <GiWireCoil className={styles.TodoTitleIcon}></GiWireCoil>
            <div className={styles.TodoTitleTitle}>TodoList With Recoil</div>
        </div>
    )
}

export default TodoTitle;