import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminPrivateRoute({children}) {
    const { isAdminAuthenticated } = useContext(AuthContext);
 
    if (isAdminAuthenticated) {
        return children;
    }
    return <Navigate to="/admin-login" />
 }