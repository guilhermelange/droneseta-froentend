import React from 'react';
import { useState } from "react";

export const SearchContext = React.createContext()

export function SearchProvider({ children }) {
    const searchState = useState("");

    return (
        <SearchContext.Provider value={{searchState}}>
            {children}
        </SearchContext.Provider>
    )
}