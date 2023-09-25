import {  Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
    let { user,setUser } = useContext(UserContext)
    setUser(JSON.parse(localStorage.getItem('user'))[0])
    return (!user ? <>{console.log(user)}<Navigate to="/login" /></> : children
    )
}

export default PrivateRoute;