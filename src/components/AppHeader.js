import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button, { SelectButton } from './Button'
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
    <div className='flex items-center justify-between h-16'>
      <Button className='btn btn-primary' onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton
        id='status'
        // className='w-40 px-5 py-2.5 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-medium text-base outline-none focus:outline-none focus:ring-4 focus:ring-opacity-70 transition-all duration-300 bg-gray-100 text-gray-500 hover:text-white hover:bg-gray-500 focus:ring-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-300 dark:text-white custom-select dark:custom-select'
        className='w-40 btn btn-gray custom-select dark:custom-select'
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
