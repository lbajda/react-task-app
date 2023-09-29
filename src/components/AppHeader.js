import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from './Button'
import TodoModal from './TodoModal'
import { updateFilterStatus } from '../slices/todoSlice'

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const dispatch = useDispatch()

  const handleFilterChange = (e) => {
    const newFilterStatus = e.target.value
    setFilterStatus(newFilterStatus)
    dispatch(updateFilterStatus(newFilterStatus))
  }

  return (
    <div className='flex items-center justify-between h-16'>
      <Button className='btn btn-primary' onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <select
        id='status'
        className='w-40 btn btn-gray custom-select dark:custom-select'
        onChange={handleFilterChange}
        value={filterStatus}>
        <option value='all'>All</option>
        <option value='incomplete'>Incomplete</option>
        <option value='complete'>Completed</option>
      </select>
      <TodoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}

export default AppHeader
