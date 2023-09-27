import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import styles from '../styles/modules/modal.module.scss';

function TodoModule() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.closeButton}>
          <MdOutlineClose />
        </div>
        <form className={styles.form}>
          <h1 className={styles.formTitle}>Add Task</h1>
        </form>
      </div>
    </div>
  );
}

export default TodoModule;
