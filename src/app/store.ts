import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../feature/authSlice'
import bookSlice from '../feature/bookSlice'
import errorSlice from '../feature/errorSlice'
// ...

export const store = configureStore({
    reducer: {
        error: errorSlice,
        books: bookSlice,
        auth: authSlice
    },
    devTools: false
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch