import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({children}) {
    const { isAuthenticated } = useContext(AuthContext);
 
    if (isAuthenticated) {
        return children;
    }
    return <Navigate to="/signin" />
 }