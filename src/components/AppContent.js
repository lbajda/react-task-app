import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/modules/app.module.scss'
import TodoItem from './TodoItem'

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList)
  const filterStatus = useSelector((state) => state.todo.filterStatus)

  const sortedTodoList = [...todoList]
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time))

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true
    }
    return item.status === filterStatus
  })

  return (
    <motion.div
      className='bg-gray-50 dark:bg-slate-300 p-6 rounded-lg'
      variants={container}
      initial='hidden'
      animate='visible'>
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            // <motion.div key={todo.id} variants={child}>
            <TodoItem key={todo.id} todo={todo} />
            // </motion.div>
          ))
        ) : (
          <motion.p
            variants={child}
            className='bg-white dark:bg-gray-800 max-w-max p-4 rounded-lg shadow-md font-medium text-xl text-center text-gray-800 dark:text-gray-100 mx-auto my-0'>
            No Tasks
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
