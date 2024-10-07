import { createContext } from "react";

interface UserContextType{
    user: string | null;
    setUser: (user: string | null) => void;
}

const UserContext = createContext<any>(null);

export default UserContext;