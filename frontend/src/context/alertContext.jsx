import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertContextProvider = ({children}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const [alertDetaile, setAlertDetails] = useState({
        severity: "success",
        text: "Success"
    })

    return (
        <AlertContext.Provider value={{isAlertOpen ,setIsAlertOpen, alertDetaile, setAlertDetails}}>
            {children}
        </AlertContext.Provider>
    );
};