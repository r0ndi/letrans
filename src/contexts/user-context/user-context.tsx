import { createContext } from "react";
import UserContextType from "../../types/user-context.type";

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
});

export default UserContext;
