import React from 'react';
import { useState } from "react";
import { usePersistentState } from "../hook/UsePersistentState"

export const SessionContext = React.createContext()

export function SessionProvider({ children }) {
    const searchState = useState("");
    const cartState = usePersistentState("cart", []);
    const userState = useState({});
    const isAuthenticated = () => {
        return !!userState[0]?.id;
    }

    return (
        <SessionContext.Provider value={{searchState, cartState, userState, isAuthenticated}}>
            {children}
        </SessionContext.Provider>
    )
}