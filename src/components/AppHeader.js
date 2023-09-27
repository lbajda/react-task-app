import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button, { SelectButton } from './Button'
import styles from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'
import { updateFilterStatus } from '../slices/todoSlice'

export default function AppHeader() {
    // const [open, setOpen] = useState(true);
    // const [modalOpen, isOpen, setIsOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const initialFilterStatus = useSelector((state) => state.todo.filterStatus)
    const [filterStatus, setFilterStatus] = useState(initialFilterStatus)
    const dispatch = useDispatch()

    const updateFilter = (e) => {
        setFilterStatus(e.target.value)
        dispatch(updateFilterStatus(e.target.value))
    }

    return (
        <div className={styles.appHeader}>
            {/* <TodoModal /> */}
            {/* <Button type="button" variant="primary">
        Add Task
      </Button> */}

            <Button onClick={() => setModalOpen(true)}>Add Task</Button>
            <SelectButton
                id='status'
                onChange={(e) => updateFilter(e)}
                value={filterStatus}>
                <option value='all'>All</option>
                <option value='incomplete'>Incomplete</option>
                <option value='complete'>Completed</option>
            </SelectButton>
            <TodoModal
                type='add'
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
            {/* <TodoModule /> */}
            {/* <DefaultModule /> */}
        </div>
    )
}

// export default AppHeader;
