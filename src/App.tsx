import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/private/ProtectedRoute'
import Signin from './pages/auth/sign-in/Signin'
import Signup from './pages/auth/sign-up/Signup'
import Author from './pages/author/Author'
import Reader from './pages/reader/Reader'

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='login' element={<Signin/>} />
          <Route path='signup' element={<Signup />} />
          <Route element={<ProtectedRoute allowedRole='author'/>}>
            <Route path='author' element={<Author/>} />
          </Route>
          <Route element={<ProtectedRoute allowedRole='guest'/>}>
            <Route path='/' element={<Reader/>} />
          </Route>
      </Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
