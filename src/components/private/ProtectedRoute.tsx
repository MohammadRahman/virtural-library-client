import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"

interface Role{
  allowedRole: string
}
const ProtectedRoute = ({allowedRole}:Role) => {

  const user  = useAppSelector(state => state.auth.user)
  console.log("from protected route",user)
  console.log(user?.role.includes(allowedRole))
  
  return user?.role.find((r:string)=> r.includes(allowedRole)) ? <Outlet/> : <Navigate to='/login' replace/>
}

export default ProtectedRoute