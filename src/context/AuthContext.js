import React from 'react';
import { useState } from "react";
import {usePersState} from '../hook/UsePersistentState' 

export const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    // const [user, setUser] = useState({});
    // const [isAuthenticated, setAuthenticated] = useState(false);
    // const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
    const [user, setUser] = usePersState("user", {});
    const [isAuthenticated, setAuthenticated] = usePersState("isAuthenticated", false);
    const [isAdminAuthenticated, setAdminAuthenticated] = usePersState("AdminAuthenticated", false);

    const login = (user) => {
        setUser(user);
        setAuthenticated(true);
    }

    const logout = () => {
        setUser({});
        setAuthenticated(false);
    }

    const loginAdmin = () => {
        setAdminAuthenticated(true);
    }

    const logoutAdmin = () => {
        setAdminAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isAdminAuthenticated, loginAdmin, logoutAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}