import { createContext, useState } from "react";
//create context
export const AccountContext = createContext();

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState({ name: "", picture: "" });
    return (
        <AccountContext.Provider value={{
            setAccount,
            account
        }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;