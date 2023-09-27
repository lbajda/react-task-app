import React, { Fragment, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { addTodo, updateTodo } from '../slices/todoSlice'
import Button from './Button'

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

export default function TodoModal({ type, setOpen, setModalOpen, todo }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [status, setStatus] = useState('incomplete')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (type === 'update') {
            setTitle(todo.title)
            setDescription(todo.description)
            setDueDate(todo.dueDate)
            setStatus(todo.status)
        } else {
            setTitle('')
            setStatus('incomplete')
        }
    }, [type, todo, setOpen])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title === '') {
            toast.error('Please enter a title')
            return
        }
        if (title && description && status && dueDate) {
            if (type === 'add') {
                dispatch(
                    addTodo({
                        id: uuidv4(),
                        title,
                        description,
                        dueDate,
                        status,
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

            setOpen(false)
        }
    }

    return (
        <>
            <button
                type='button'
                className='bg-blue-500 text-white px-4 py-2 rounded-md'
                onClick={() => setIsOpen(!isOpen)}>
                Add Task
            </button>
            <Transition
                as={Fragment}
                show={isOpen}
                enter='transition-opacity duration-500'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-500'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'>
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4 md:container md:mx-auto w-11/12 sm:w-4/5 md:w-[32rem]'>
                        <div className='flex justify-end'>
                            <button
                                type='button'
                                className='text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                onClick={() => setIsOpen(!isOpen)}>
                                <span className='sr-only'>Close</span>
                                <XMarkIcon
                                    className='h-6 w-6'
                                    aria-hidden='true'
                                />
                            </button>
                        </div>
                        <h1 className='text-2xl font-bold'>Add Task</h1>
                        <form
                            className='flex flex-col space-y-4 mt-4'
                            onSubmit={(e) => handleSubmit(e)}>
                            <label htmlFor='title' className='flex flex-col'>
                                Title
                                <input
                                    type='text'
                                    id='title'
                                    name='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className='border border-gray-300 rounded-md p-2'
                                />
                            </label>
                            <label
                                htmlFor='description'
                                className='flex flex-col'>
                                Description
                                <textarea
                                    name='description'
                                    id='description'
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    cols='30'
                                    rows='5'
                                    className='border border-gray-300 rounded-md p-2'
                                />
                            </label>

                            <div className='flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4'>
                                <label
                                    htmlFor='type'
                                    className='flex flex-col grow'>
                                    Status
                                    <select
                                        name='status'
                                        id='type'
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        className='border border-gray-300 rounded-md p-2'>
                                        <option value='incomplete'>
                                            Incomplete
                                        </option>
                                        <option value='complete'>
                                            Completed
                                        </option>
                                    </select>
                                </label>
                                <label
                                    htmlFor='dueDate'
                                    className='flex flex-col grow'>
                                    Due Date
                                    <input
                                        type='date'
                                        id='dueDate'
                                        name='dueDate'
                                        value={dueDate}
                                        onChange={(e) =>
                                            setDueDate(e.target.value)
                                        }
                                        className='border border-gray-300 rounded-md p-2'
                                    />
                                </label>
                            </div>
                            <div className='flex justify-end pt-10'>
                                <button
                                    type='button'
                                    className='border border-gray-300 rounded-md p-2 mr-2'
                                    onClick={() => setIsOpen(false)}>
                                    Cancel
                                </button>
                                <Button type='submit' variant='primary'>
                                    {type === 'add'
                                        ? 'Add Task'
                                        : 'Update Task'}
                                </Button>
                                {/* <button
                                    type='submit'
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                                    {type === 'add'
                                        ? 'Add Task'
                                        : 'Update Task'}
                                </button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </Transition>
        </>
    )
}
