import { createContext, useState } from "react";

export const navigationContext = createContext();

export const NavigationContext = ( { children } ) =>
{
    const [ page, setPage ] = useState("Cliente");
    
    return (
        <navigationContext.Provider value={{page, setPage}} >
            {children}
        </navigationContext.Provider>
    )
}