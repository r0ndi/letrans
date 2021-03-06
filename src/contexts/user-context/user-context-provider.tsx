import { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import ComponentWithChildrenType from "../../types/component-with-children.type";
import UserResponse from "../../services/letrans-api/models/response/user.response";
import UserContext from "./user-context";
import NullableType from "../../types/nullable.type";

const UserContextProvider = ({ children }: ComponentWithChildrenType) => {
    const [user, setUser] = useState<NullableType<UserResponse>>(null);

    useEffect(() => {
        (async () => {
            const authService = new AuthService();
            setUser(await authService.getLoggedUser());
        })();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;