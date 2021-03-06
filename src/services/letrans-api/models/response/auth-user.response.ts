import UserResponse from "./user.response";

interface AuthUserResponse {
    accessToken: string;
    user: UserResponse;
}

export default AuthUserResponse;