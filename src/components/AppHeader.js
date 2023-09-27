import { React, useState } from 'react'
import Button, { SelectButton } from './Button'
import styles from '../styles/modules/app.module.scss'
import DefaultModule from './DefaultModule'
import AddTaskBtn from './AddTaskBtn'
// import TodoModule from './TodoModule';

export default function AppHeader() {
    // const [open, setOpen] = useState(true);

    return (
        <div className={styles.appHeader}>
            <AddTaskBtn />
            {/* <Button type="button" variant="primary">
        Add Task
      </Button> */}
            <SelectButton id='status'>
                <option value='all'>All</option>
                <option value='incomplete'>Incomplete</option>
                <option value='completed'>Completed</option>
            </SelectButton>
            {/* <TodoModule /> */}
            {/* <DefaultModule /> */}
        </div>
    )
}

// export default AppHeader;
