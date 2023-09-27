import { createSlice } from '@reduxjs/toolkit'

const getInitialTodos = () => {
    const todoListString = localStorage.getItem('todoList')
    const todoList = todoListString ? JSON.parse(todoListString) : []
    return todoList
}

const initialValue = {
    todoList: getInitialTodos(),
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
        addTodo: (state, action) => {
            const { id, title, description, status } = action.payload
            return {
                ...state,
                todoList: [
                    ...state.todoList,
                    { id, title, description, status },
                ],
            }
        },
        deleteTodo: (state, action) => {
            const { id } = action.payload
            const newTodoList = state.todoList.filter(
                (todoItem) => todoItem.id !== id
            )
            state.todoList = newTodoList
        },
        updateTodo: (state, action) => {
            const { id, title, description, status } = action.payload
            const todoItem = state.todoList.find((todo) => todo.id === id)
            if (todoItem) {
                todoItem.title = title
                todoItem.description = description
                todoItem.status = status
            }
        },
    },
})

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer
