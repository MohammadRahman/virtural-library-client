
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { clearError, setError } from "./errorSlice"

type Books ={
    _id: string,
    name: string,
    author: {
        _id: string,
        name: string
    } | null,
    readCounts:number
}
interface InintStateType{
    loading: boolean
    books: Books[]
    authorBooks: Books[]
    status: 'idle' | 'success'|'failed'
}
const initialState: InintStateType = {
    loading: false,
    books: [],
    authorBooks: [],
    status: 'idle'
}

export const updateBookReader = createAsyncThunk('book/update', async (value:any, { rejectWithValue, dispatch }) => {
    try {
        const token = localStorage.getItem('token')
        console.log(token)
        if (token) {
            axios.defaults.headers.common['authorization'] = `Bearer ${token}`
        }
        const response = await axios.put(`https://18.193.111.246/api/update/book/${value}`)
        console.log('update reads count', response.data)
        return response.data
    } catch (error:any) {
        if (axios.isAxiosError(error)) {
            dispatch(setError(error.response?.data.message ?? 'Axios Error'))
            return rejectWithValue(error.response?.data)
        } else {
            dispatch(setError('Server error'))
            return rejectWithValue({ error: error.message })
        }
    }
})

export const fetchBooks = createAsyncThunk('books/get', async (_, { rejectWithValue, dispatch }) => {
    try {
        const token = localStorage.getItem('token')
        console.log(token)
        if (token) {
            axios.defaults.headers.common['authorization'] = `Bearer ${token}`
        }
        const response = await axios.get('https://18.193.111.246/api/get/books')
        if (response.data) {
            console.log(response.data)
            dispatch(clearError())
            return response.data.books
        }
    } catch (error:any) {
        if (axios.isAxiosError(error)) {
            dispatch(setError(error.response?.data.message ?? 'Axios Error'))
            return rejectWithValue(error.response?.data)
        } else {
            dispatch(setError('Server error'))
            return rejectWithValue({ error: error.message })
        }
    }
})

export const getMyBooks = createAsyncThunk('author/books', async (_, {rejectWithValue,dispatch}) => {
    try {
        const token = localStorage.getItem('token')
        console.log(token)
        if (token) {
            axios.defaults.headers.common['authorization'] = `Bearer ${token}`
        }
        const response = await axios.get("https://18.193.111.246/api/get/my/books")
        console.log('author', response.data.books)
        
        // return response.data
        return response.data.books
        
    } catch (error:any) {
        if (axios.isAxiosError(error)) {
            dispatch(setError(error.response?.data.message ?? 'Axios Error'))
            return rejectWithValue(error.response?.data)
        } else {
            dispatch(setError('Server error'))
            return rejectWithValue({ error: error.message })
        }
    }
})

export const publishBook = createAsyncThunk('publish/book', async (values: any, { rejectWithValue, dispatch }) => {
    try {
        const {name} = values
        const token = localStorage.getItem('token')
        if (token) {
            axios.defaults.headers.common['authorization'] = `Bearer ${token}`
        }
        const response = await axios.post("https://18.193.111.246/api/create/book", { name })
        return response.data
    } catch (error:any) {
        if (axios.isAxiosError(error)) {
            dispatch(setError(error.response?.data.message ?? 'Axios Error'))
            return rejectWithValue(error.response?.data)
        } else {
            dispatch(setError('Server error'))
            return rejectWithValue({ error: error.message })
        }
    }
})
const bkkoSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       
        builder.addCase(fetchBooks.pending, (state) => {
           state.loading = true
       }),
            builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<any>) => {
                state.books = action.payload
                state.loading = false
            })
        builder.addCase(fetchBooks.rejected, (state) => {
           state.loading = false
        }),
            builder.addCase(updateBookReader.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'success'
            }),
            builder.addCase(getMyBooks.fulfilled, (state, action: PayloadAction<any>) => {
                state.authorBooks = action.payload  
            }),
            // builder.addCase(publishBook.pending, (state) => {
            //     state.loading = true
            // }),
            builder.addCase(publishBook.fulfilled, (state) => {
                state.loading = false
                state.status = 'success'
            }),
            builder.addCase(publishBook.rejected, (state) => {
                state.status = 'failed'
            })
    }
})
export default bkkoSlice.reducer