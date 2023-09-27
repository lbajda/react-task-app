import { format } from 'date-fns'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from '../slices/todoSlice'
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import CheckButton from './CheckButton'
import TodoModal from './TodoModal'

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
            <motion.div className={styles.item} variants={child}>
                <div className={styles.todoDetails}>
                    <CheckButton checked={checked} handleCheck={handleCheck} />
                    <div className={styles.texts}>
                        <p
                            className={getClasses([
                                styles.todoText,
                                todo.status === 'complete' &&
                                    styles['todoText--completed'],
                            ])}>
                            {todo.title}
                        </p>
                        <p className={styles.time}>
                            {format(new Date(todo.time), 'p, MM/dd/yyyy')}
                        </p>
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div
                        // className={styles.icon}
                        className='bg-slate-200  hover:bg-red-300 text-slate-500 p-3 rounded-lg transition-colors'
                        onClick={() => handleDelete()}
                        onKeyDown={() => handleDelete()}
                        tabIndex={0}
                        role='button'>
                        <TrashIcon className='h-6 w-6 ' />
                    </div>
                    <div
                        className={styles.icon}
                        onClick={() => handleUpdate()}
                        onKeyDown={() => handleUpdate()}
                        tabIndex={0}
                        role='button'>
                        <PencilIcon className='h-6 w-6' />
                    </div>
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
