import { format, isPast } from 'date-fns'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import React, { useEffect, useState } from 'react'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from '../slices/todoSlice'
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import CheckButton from './CheckButton'
import TodoModal from './TodoModal'
import Button from './Button'

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

function TodoItem({ todo }) {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const dueDate = new Date(todo.dueDate)

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [todo.status])

  const handleCheck = () => {
    setChecked(!checked)
    dispatch(
      updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
    )
  }

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
    toast.success('Todo Deleted Successfully')
  }

  const handleUpdate = () => {
    setUpdateModalOpen(true)
  }

  return (
    <>
      <motion.div
        className='flex items-center justify-between p-4 mb-6 last:mb-0 rounded-lg shadow-md bg-white dark:bg-zinc-900'
        variants={child}>
        <div className='flex items-center justify-start gap-4'>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className='flex flex-col overflow-hidden'>
            <p
              className={getClasses([
                'font-medium text-xl break-words text-gray-800 dark:text-gray-100',
                todo.status === 'complete' && 'line-through opacity-70',
              ])}>
              {todo.title}
            </p>
            <div className='flex flex-row gap-3'>
              <div className='text-gray-500 dark:text-gray-400 text-sm flex-auto'>
                <span className='font-medium'>Created:&nbsp;</span>
                {format(new Date(todo.time), 'p, M/d/yy')}
              </div>
              {todo.dueDate ? (
                <div
                  className={`text-sm flex-auto ${
                    isPast(dueDate) && todo.status !== 'complete'
                      ? 'text-red-500 dark:text-red-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  <span className='font-medium'>Due:&nbsp;</span>
                  {format(new Date(todo.dueDate), 'M/d/yy')}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center space-x-4'>
          <Button
            className='btn btn-danger-outline !p-2.5'
            onClick={() => handleDelete()}
            tabIndex={0}>
            <TrashIcon className='h-6 w-6 ' />
          </Button>
          <Button
            className='btn btn-primary !p-2.5'
            onClick={() => handleUpdate()}
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
