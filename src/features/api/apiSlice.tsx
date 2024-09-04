import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Todo = {
    userId: number
    id: string
    title: string
    completed: boolean
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        
        getTodos: builder.query<Todo[], void>({  // It requires a Response DataType and a Query Argument Type. void if not argument.
            query: () => '/todos',
            transformResponse: (response: Todo[]) => response.sort((a: any, b: any) => b.id - a.id),
            providesTags: ['Todos']
        }),

        addTodo: builder.mutation<Todo, Partial<Todo>>({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),

        updateTodo: builder.mutation<Todo, Todo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        
        deleteToto: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos']
        })
    }),
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTotoMutation
} = apiSlice;


