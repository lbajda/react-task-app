import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button, { SelectButton } from './Button'
import styles from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'
import { updateFilterStatus } from '../slices/todoSlice'

export default function AppHeader() {
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
      <Button variant='indigo' onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton
        id='status'
        // className='block w-40 mt-1 bg-gray-200  border px-4 py-2 outline-none rounded-md shadow-sm focus:border-gray-300  focus:ring-4 focus:ring-gray-200 focus:outline-none focus:ring-opacity-75 custom-select'
        className='w-40 px-5 py-2.5 inline-flex justify-center items-center gap-2 rounded-lg bg-gray-100 border border-transparent font-medium text-gray-500 hover:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 text-md dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:text-white dark:focus:ring-offset-gray-800 custom-select dark:custom-select'
        onChange={(e) => updateFilter(e)}
        value={filterStatus}>
        <option value='all'>All</option>
        <option value='incomplete'>Incomplete</option>
        <option value='complete'>Completed</option>
      </SelectButton>
      <TodoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}
