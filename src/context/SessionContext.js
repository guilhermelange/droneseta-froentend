import React from 'react';
import { useState } from "react";
import { usePersistentState } from "../hook/UsePersistentState"

export const SessionContext = React.createContext()

export function SessionProvider({ children }) {
    const searchState = useState("");
    const cartState = usePersistentState("cart", []);

    return (
        <SessionContext.Provider value={{searchState, cartState }}>
            {children}
        </SessionContext.Provider>
    )
}