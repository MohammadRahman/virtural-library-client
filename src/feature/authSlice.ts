import { createAsyncThunk } from './../../node_modules/@reduxjs/toolkit/src/createAsyncThunk';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios';
import { clearError, setError } from './errorSlice';

type User={
    name: string,
    email: string,
    role: any
    token: string
}

type RegisterData = {
    name: string,
    email: string,
    password: string
}

type InitialStateType = {
    user: User | null,
    status: 'idle' | 'active' | 'failed' | 'success'
}
const initialState: InitialStateType = {
    user: null,
    status: 'idle'
}

export const loginWithEmailAndPassword = createAsyncThunk('user/auth', async(values: any, {rejectWithValue,dispatch}) => {
    try {
        const {email,password, navigate} = values 
        const response = await axios.post('https://18.193.111.246/api/user/login', { email, password })
        if (response.data) {
            dispatch(clearError())
            localStorage.setItem('token', response.data.token)
        }
        if (response.data.user.role.includes('author')) {
            navigate('/author')
        }
        if (response.data.user.role.includes('guest')) {
            navigate('/')
        }
      
        return response.data.user
    } catch (error:any) {
        if (axios.isAxiosError(error)) {
            dispatch(setError(error.response?.data.message ?? 'Axios Error'))
            return rejectWithValue(error.response?.data)
        }
        else {
            dispatch(setError('Server error'))
            return rejectWithValue({ error: error.message })
        }
    }
})
export const updateAsAuthor = createAsyncThunk('user/update', async (_,{rejectWithValue,dispatch}) => {
    try {
        // const {navigate} = value
        const token = localStorage.getItem('token')
        if (token) {
            axios.defaults.headers.common['authorization'] = `Bearer ${token}`
        }
        const response = await axios.put('https://18.193.111.246/api/user/update')
        console.log("response from user-update",response.data)
        if (response.data) {
            // navigate('/author')
            return response.data
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
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state => {
            state.user = null
        })
    },
    extraReducers: (builder) => {
        builder.addCase(loginWithEmailAndPassword.pending, (state) => {
            state.status ='idle'
        }),
            builder.addCase(loginWithEmailAndPassword.fulfilled, (state, action: PayloadAction<any>) => {
                state.user = action.payload
            }),
            builder.addCase(loginWithEmailAndPassword.rejected, (state) => {
                state.status = 'failed'
            }),
            builder.addCase(updateAsAuthor.fulfilled, (state) => {
                state.status = 'success'
                // state.user = action.payload
            })
    }
})

export const {logOut} = authSlice.actions
export default authSlice.reducer
