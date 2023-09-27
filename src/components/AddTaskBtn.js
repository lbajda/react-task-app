import React, { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addTodo } from '../slices/todoSlice'
// import { add } from 'date-fns'

export default function AddTaskBtn() {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [dueDate, setDueDate] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ title, description, status, dueDate })
        if (title && description && status && dueDate) {
            dispatch(
                addTodo({
                    id: uuidv4(),
                    title,
                    description,
                    status,
                    dueDate,
                    timestamp: new Date().toLocaleDateString,
                })
            )
        }
    }

    return (
        <>
            <button
                type='button'
                className='bg-blue-500 text-white px-4 py-2 rounded-md'
                onClick={() => setOpen(!open)}>
                Add Task
            </button>
            <Transition
                as={Fragment}
                show={open}
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
                                onClick={() => setOpen(!open)}>
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
                            <label htmlFor='title'>Title</label>
                            <input
                                type='text'
                                id='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='border border-gray-300 rounded-md p-2'
                            />
                            <label htmlFor='description'>Description</label>
                            <textarea
                                name='description'
                                id='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols='30'
                                rows='10'
                                className='border border-gray-300 rounded-md p-2'
                            />

                            <label htmlFor='status'>Status</label>
                            <select
                                name='status'
                                id='status'
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className='border border-gray-300 rounded-md p-2'>
                                <option value='incomplete'>Incomplete</option>
                                <option value='completed'>Completed</option>
                            </select>

                            <label htmlFor='dueDate'>Due Date</label>
                            <input
                                type='date'
                                id='dueDate'
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className='border border-gray-300 rounded-md p-2'
                            />
                            <div className='flex justify-end'>
                                <button
                                    type='submit'
                                    onClick={() => setOpen(!open)}
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Transition>
        </>
    )
}
