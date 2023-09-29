import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { addTodo, updateTodo } from '../slices/todoSlice'
import Button, { SelectButton } from './Button'

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
}

export default function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('incomplete')

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title)
      setStatus(todo.status)
      setDescription(todo.description)
      setDueDate(todo.dueDate)
    } else {
      setTitle('')
      setStatus('incomplete')
      setDescription('')
      setDueDate('')
    }
  }, [type, todo, modalOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title) {
      toast.error('Please enter a title')
      return
    }
    if (type === 'add') {
      dispatch(
        addTodo({
          id: uuid(),
          title,
          status,
          description,
          dueDate,
          time: new Date().toLocaleString(),
        })
      )
      toast.success('Task added successfully')
    } else if (
      type === 'update' &&
      todo &&
      (todo.title !== title ||
        todo.status !== status ||
        todo.description !== description ||
        todo.dueDate !== dueDate)
    ) {
      dispatch(
        updateTodo({
          ...todo,
          title,
          status,
          description,
          dueDate,
        })
      )
      toast.success('Task Updated successfully')
    } else {
      toast.error('No changes made')
      return
    }
    setModalOpen(false)
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className='fixed flex justify-center items-center top-0 left-0 w-full h-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'>
            <motion.div
              className='fixed top-0 left-0 w-full h-full '
              variants={dropIn}
              initial='hidden'
              animate='visible'
              exit='exit'>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg p-4 md:container md:mx-auto w-11/12 sm:w-4/5 md:w-[32rem] bg-white dark:bg-zinc-900'>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    className='rounded-md text-gray-500 hover:text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-gray-100 dark:hover:text-gray-200 dark:focus:ring-gray-300 transition-all duration-300'
                    onKeyDown={() => setModalOpen(false)}
                    onClick={() => setModalOpen(false)}>
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <form
                  className='flex flex-col space-y-4 mt-4'
                  onSubmit={(e) => handleSubmit(e)}>
                  <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-100'>
                    {type === 'add' ? 'Add' : 'Update'} Task
                  </h1>

                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                      <label htmlFor='title' className='default-label'>
                        Title
                      </label>
                      <span className='block text-sm font-normal text-gray-500 dark:text-white/60'>
                        Required
                      </span>
                    </div>
                    <input
                      type='text'
                      id='title'
                      name='title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className='default-input'
                      placeholder='Task Title...'
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor='description' className='default-label'>
                      Description
                    </label>
                    <textarea
                      name='description'
                      id='description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className='default-input'
                      rows='3'
                      placeholder='Task description...'
                    />
                  </div>

                  <div className='flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4'>
                    <div className='flex flex-col grow gap-2'>
                      <label htmlFor='type' className='default-label'>
                        Status
                      </label>
                      <select
                        id='type'
                        name='status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='default-input custom-select-2'>
                        <option value='incomplete'>Incomplete</option>
                        <option value='complete'>Completed</option>
                      </select>
                    </div>
                    <div className='flex flex-col grow gap-2'>
                      <label htmlFor='dueDate' className='default-label'>
                        Due Date
                      </label>
                      <input
                        type='date'
                        id='dueDate'
                        name='dueDate'
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className='default-input'
                      />
                    </div>
                  </div>
                  <div className='flex flex-row-reverse justify-start pt-10 gap-2'>
                    <Button className='btn btn-primary' type='submit'>
                      {type === 'add' ? 'Add Task' : 'Update Task'}
                    </Button>
                    <Button
                      className='btn btn-gray'
                      onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
