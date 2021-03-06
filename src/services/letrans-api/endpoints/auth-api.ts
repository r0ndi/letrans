import ApiService from "../api.service";
import RegisterRequest from "../models/request/register.request";
import AuthUserResponse from "../models/response/auth-user.response";
import LoginRequest from "../models/request/login.request";

class AuthApi {
    public api: ApiService = new ApiService();

    public refresh = async (): Promise<AuthUserResponse> => {
        const response = await this.api.post("auth/refresh");
        return response.success ? response.data : "";
    }

    public logIn = async (loginData: LoginRequest): Promise<string> => {
        const response = await this.api.post("auth/login", loginData);
        return response.success ? response.data.accessToken : "";
    }

    public register = async (registerData: RegisterRequest): Promise<string> => {
        const response = await this.api.post("auth/register", registerData);
        return response.success ? response.data.accessToken : "";
    }
}

export default AuthApi;
