import { Children, createContext, useState } from "react";



const UserContext = createContext();

export const UserProvider = ({Children})=>{
    const [user , setUser] = useState(null);

    const login = (userData , expires)=>{
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('expires', expires);
    }
}