import React from 'react';
import { useState } from "react";

export const SessionContext = React.createContext()

export function SessionProvider({ children }) {
    const searchState = useState("");

    return (
        <SessionContext.Provider value={{searchState}}>
            {children}
        </SessionContext.Provider>
    )
}