import { format, isPast } from 'date-fns'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import React, { useEffect, useState } from 'react'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from '../slices/todoSlice'
import { getClasses } from '../utils/getClasses'
import CheckButton from './CheckButton'
import TodoModal from './TodoModal'
import Button from './Button'

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

function TodoItem({ todo }) {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(todo.status === 'complete')
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()
  const options = { timeZone }
  const inputDate = new Date(todo.dueDate).toLocaleString('en-US', options)
  const dueDateOffset = new Date(
    new Date(inputDate).setHours(new Date(inputDate).getHours() + 6)
  )
  const dueDate = new Date(dueDateOffset)

  useEffect(() => {
    setChecked(todo.status === 'complete')
  }, [todo.status])

  const handleCheck = () => {
    const newStatus = checked ? 'incomplete' : 'complete'
    setChecked(!checked)
    dispatch(updateTodo({ ...todo, status: newStatus }))
  }

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
    toast.success('Todo Deleted Successfully')
  }

  const handleUpdate = () => {
    setUpdateModalOpen(true)
  }

  const createdDate = format(new Date(todo.time), 'p, M/d/yy')
  const dueDateFormatted = todo.dueDate
    ? format(new Date(dueDate), 'M/d/yy')
    : null
  const isPastDue = isPast(dueDate) && todo.status !== 'complete'
  const dueDateClass = isPastDue
    ? 'text-red-500 dark:text-red-400'
    : 'text-gray-500 dark:text-gray-400'

  return (
    <>
      <motion.div
        className='flex items-center justify-between p-4 mb-6 last:mb-0 rounded-lg shadow-md bg-white dark:bg-zinc-900'
        variants={child}>
        <div className='flex items-center justify-start gap-4'>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className='flex flex-col overflow-hidden pr-5'>
            <p
              className={getClasses([
                'font-medium text-xl break-words text-gray-800 dark:text-gray-100',
                todo.status === 'complete' && 'line-through opacity-70',
              ])}>
              {todo.title}
            </p>
            <div className='flex flex-col md:flex-row gap-1 md:gap-3'>
              <div className='text-sm flex-auto text-gray-500 dark:text-gray-400'>
                <span className='font-medium'>Created:&nbsp;</span>
                {createdDate}
              </div>
              {dueDateFormatted && (
                <div className={`text-sm flex-auto ${dueDateClass}`}>
                  <span className='font-medium'>Due:&nbsp;</span>
                  {dueDateFormatted}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center space-x-4'>
          <Button
            className='btn btn-danger-outline !p-2.5'
            onClick={handleDelete}
            tabIndex={0}>
            <TrashIcon className='h-6 w-6 ' />
          </Button>
          <Button
            className='btn btn-primary !p-2.5'
            onClick={handleUpdate}
            tabIndex={0}>
            <PencilIcon className='h-6 w-6' />
          </Button>
        </div>
      </motion.div>
      <TodoModal
        type='update'
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  )
}

export default TodoItem
