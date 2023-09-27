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
        // addTodo: (state, action) => {
        //     const { id, title, description, status } = action.payload
        //     produce(state, (draftState) => {
        //         draftState.todoList.push({ id, title, description, status })
        //     })
        // },
        deleteTodo: (state, action) => {
            const { id } = action.payload
            const newTodoList = state.todoList.filter((todo) => todo.id !== id)
            state.todoList = newTodoList
        },
        updateTodo: (state, action) => {
            const { id, title, description, status } = action.payload
            const todo = state.todoList.find((todo) => todo.id === id)
            if (todo) {
                todo.title = title
                todo.description = description
                todo.status = status
            }
        },
    },
})

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer

// import { createSlice } from '@reduxjs/toolkit'

// const getInitialTodos = () => {
//     const todoListString = localStorage.getItem('todoList')
//     const todoList = todoListString ? JSON.parse(todoListString) : []
//     return todoList
// }

// const initialValue = {
//     todoList: getInitialTodos(),
// }

// export const todoSlice = createSlice({
//     name: 'todo',
//     initialState: initialValue,
//     reducers: {
//         addTodo: (state, action) => {
//             const { id, title, description, status } = action.payload
//             state.todoList.push({ id, title, description, status })
//         },
//         deleteTodo: (state, action) => {
//             const { id } = action.payload
//             const newTodoList = state.todoList.filter((todo) => todo.id !== id)
//             state.todoList = newTodoList
//         },
//         updateTodo: (state, action) => {
//             const { id, title, description, status } = action.payload
//             const todo = state.todoList.find((todo) => todo.id === id)
//             if (todo) {
//                 todo.title = title
//                 todo.description = description
//                 todo.status = status
//             }
//         },
//     },
// })
