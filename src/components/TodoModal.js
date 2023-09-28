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
    if (title === '') {
      toast.error('Please enter a title')
      return
    }
    if (title && status) {
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
      }
      if (type === 'update') {
        if (
          todo.title !== title ||
          todo.status !== status ||
          todo.description !== description ||
          todo.dueDate !== dueDate
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
      }
      setModalOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          // className={styles.wrapper}
          className='fixed flex justify-center items-center top-0 left-0 w-full h-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'>
            <motion.div
              // className={styles.container}
              // className='relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4 md:container md:mx-auto w-11/12 sm:w-4/5 md:w-[32rem]'
              className='fixed top-0 left-0 w-full h-full '
              variants={dropIn}
              initial='hidden'
              animate='visible'
              exit='exit'>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4 md:container md:mx-auto w-11/12 sm:w-4/5 md:w-[32rem]'>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    className='text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    onKeyDown={() => setModalOpen(false)}
                    onClick={() => setModalOpen(false)}>
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                {/* <h1 className='text-2xl font-bold'>Add Task</h1> */}
                <form
                  className='flex flex-col space-y-4 mt-4'
                  onSubmit={(e) => handleSubmit(e)}>
                  <h1 className='text-2xl font-bold'>
                    {type === 'add' ? 'Add' : 'Update'} Task
                  </h1>
                  <label htmlFor='title' className='flex flex-col'>
                    Title
                    <input
                      type='text'
                      id='title'
                      name='title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className='border border-gray-300 p-2 outline-none rounded-md focus:border-gray-300  focus:ring-4 focus:ring-gray-200 focus:ring-opacity-75 transition-all duration-300'
                    />
                  </label>
                  <label htmlFor='description' className='flex flex-col'>
                    Description
                    <textarea
                      name='description'
                      id='description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      cols='30'
                      rows='5'
                      className='border border-gray-300 p-2 outline-none rounded-md focus:border-gray-300  focus:ring-4 focus:ring-gray-200 focus:ring-opacity-75 transition-all duration-300'
                    />
                  </label>

                  <div className='flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4'>
                    <label htmlFor='type' className='flex flex-col grow'>
                      Status
                      {/* <select
                                                name='status'
                                                id='type'
                                                value={status}
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                                className='border border-gray-300 p-2 outline-none rounded-md focus:border-gray-300  focus:ring-4 focus:ring-gray-200 focus:ring-opacity-75'>
                                                <option value='incomplete'>
                                                    Incomplete
                                                </option>
                                                <option value='complete'>
                                                    Completed
                                                </option>
                                            </select> */}
                      <SelectButton
                        name='status'
                        id='type'
                        className='block bg-white border border-gray-300 p-2 outline-none rounded-md focus:border-gray-300  focus:ring-4 focus:ring-gray-200 focus:ring-opacity-75 custom-select transition-all duration-300'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value='incomplete'>Incomplete</option>
                        <option value='complete'>Completed</option>
                      </SelectButton>
                    </label>
                    <label htmlFor='dueDate' className='flex flex-col grow'>
                      Due Date
                      <input
                        type='date'
                        id='dueDate'
                        name='dueDate'
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className='border border-gray-300 p-2 outline-none rounded-md focus:border-gray-300  focus:ring-4 focus:ring-gray-200 focus:ring-opacity-75 transition-all duration-300'
                      />
                    </label>
                  </div>
                  <div className='flex flex-row-reverse justify-start pt-10 gap-2'>
                    <Button
                      className='bg-indigo-100 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500 dark:focus:ring-offset-gray-800'
                      type='submit'>
                      {type === 'add' ? 'Add Task' : 'Update Task'}
                    </Button>
                    <button
                      type='button'
                      className='bg-gray-100 text-gray-500 hover:text-white hover:bg-gray-500 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:text-white dark:focus:ring-offset-gray-800'
                      onClick={() => setModalOpen(false)}>
                      Cancel
                    </button>
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
