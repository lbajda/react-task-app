import { createSlice } from '@reduxjs/toolkit'

const getInitialState = () => {
    // getting todo list from local storage
    const todoList = window.localStorage.getItem('todoList')
    // if todo list is not empty
    if (todoList) {
        return JSON.parse(todoList)
    }
    window.localStorage.setItem('todoList', [])
    return []
}

const initialValues = {
    filterStatus: 'all',
    todoList: getInitialState(),
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValues,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload)
            const todoList = window.localStorage.getItem('todoList')
            if (todoList) {
                const todoListArr = JSON.parse(todoList)
                todoListArr.push({
                    ...action.payload,
                })
                window.localStorage.setItem(
                    'todoList',
                    JSON.stringify(todoListArr)
                )
            } else {
                window.localStorage.setItem(
                    'todoList',
                    JSON.stringify([
                        {
                            ...action.payload,
                        },
                    ])
                )
            }
        },
        updateTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList')
            if (todoList) {
                const todoListArr = JSON.parse(todoList)
                todoListArr.forEach((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.status = action.payload.status
                        todo.title = action.payload.title
                    }
                })
                window.localStorage.setItem(
                    'todoList',
                    JSON.stringify(todoListArr)
                )
                state.todoList = [...todoListArr]
            }
        },
        deleteTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList')
            if (todoList) {
                const todoListArr = JSON.parse(todoList)
                todoListArr.forEach((todo, index) => {
                    if (todo.id === action.payload) {
                        todoListArr.splice(index, 1)
                    }
                })
                window.localStorage.setItem(
                    'todoList',
                    JSON.stringify(todoListArr)
                )
                state.todoList = todoListArr
            }
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload
        },
    },
})

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } =
    todoSlice.actions

export default todoSlice.reducer
