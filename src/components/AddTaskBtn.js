import React, { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addTodo } from '../slices/todoSlice'

export default function AddTaskBtn() {
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        status: '',
        dueDate: '',
    })
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formValues)
        if (Object.values(formValues).every((value) => value)) {
            dispatch(
                addTodo({
                    id: uuidv4(),
                    ...formValues,
                    timestamp: new Date().toLocaleDateString(),
                })
            )
            setFormValues({
                title: '',
                description: '',
                status: '',
                dueDate: '',
            })
            setOpen(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
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
                                name='title'
                                value={formValues.title}
                                onChange={(e) => handleChange(e)}
                                className='border border-gray-300 rounded-md p-2'
                            />
                            <label htmlFor='description'>Description</label>
                            <textarea
                                name='description'
                                id='description'
                                value={formValues.description}
                                onChange={(e) => handleChange(e)}
                                cols='30'
                                rows='10'
                                className='border border-gray-300 rounded-md p-2'
                            />

                            <label htmlFor='status'>Status</label>
                            <select
                                name='status'
                                id='status'
                                value={formValues.status}
                                onChange={(e) => handleChange(e)}
                                className='border border-gray-300 rounded-md p-2'>
                                <option value='incomplete'>Incomplete</option>
                                <option value='completed'>Completed</option>
                            </select>

                            <label htmlFor='dueDate'>Due Date</label>
                            <input
                                type='date'
                                id='dueDate'
                                name='dueDate'
                                value={formValues.dueDate}
                                onChange={(e) => handleChange(e)}
                                className='border border-gray-300 rounded-md p-2'
                            />
                            <div className='flex justify-end'>
                                <button
                                    type='submit'
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
