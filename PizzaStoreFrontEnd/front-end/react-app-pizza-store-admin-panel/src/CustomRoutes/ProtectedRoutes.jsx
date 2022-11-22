import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { adminSelector } from "../redux/slices/adminSlice";



function ProtectedRoutes() {
  const admin = useSelector(adminSelector);
  return admin.isAdmin ? <Outlet/> : <Navigate to='/'/>
 
}

export default ProtectedRoutes