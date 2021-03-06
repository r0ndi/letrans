import UserResponse from "./letrans-api/models/response/user.response";
import LetransService from "./letrans-api/letrans.service";
import NullableType from "../types/nullable.type";
import AuthUserResponse from "./letrans-api/models/response/auth-user.response";
import RegisterRequest from "./letrans-api/models/request/register.request";
import LoginRequest from "./letrans-api/models/request/login.request";

class AuthService {
    public static STORAGE_ACCESS_TOKEN: string = "accessToken";
    private letransService: LetransService = new LetransService();

    public getLoggedUser = async (): Promise<NullableType<UserResponse>> => {
        if (!localStorage.getItem(AuthService.STORAGE_ACCESS_TOKEN)) {
            return null;
        }

        const response: AuthUserResponse = await this.letransService.auth.refresh();
        if (!response.accessToken) {
            localStorage.setItem(AuthService.STORAGE_ACCESS_TOKEN, "");
            return null;
        }

        localStorage.setItem(AuthService.STORAGE_ACCESS_TOKEN, response.accessToken);
        return response.user as UserResponse;
    }

    public logIn = async (loginData: LoginRequest): Promise<boolean> => {
        const accessToken: string = await this.letransService.auth.logIn(loginData);
        if (!accessToken) {
            return false;
        }

        localStorage.setItem(AuthService.STORAGE_ACCESS_TOKEN, accessToken);
        return true;
    }

    public register = async (userData: RegisterRequest): Promise<boolean> => {
        const accessToken: string = await this.letransService.auth.register(userData);
        if (!accessToken) {
            return false;
        }

        localStorage.setItem(AuthService.STORAGE_ACCESS_TOKEN, accessToken);
        return true;
    }
}

export default AuthService;
