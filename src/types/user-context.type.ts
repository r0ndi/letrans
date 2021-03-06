import { Dispatch, SetStateAction } from "react";
import UserResponse from "../services/letrans-api/models/response/user.response";
import NullableType from "./nullable.type";

type UserContextType = {
    user: NullableType<UserResponse>;
    setUser: Dispatch<SetStateAction<NullableType<UserResponse>>>;
}

export default UserContextType;
