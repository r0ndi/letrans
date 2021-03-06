import UserResponse from "../models/response/user.response";
import ApiService from "../api.service";

class UserApi {
    public api: ApiService = new ApiService();

    public patch = async (userData: UserResponse): Promise<boolean> => {
        const response = await this.api.patch(`user/${userData.id}`, userData);
        return response.success;
    }

    public delete = async (userId: string): Promise<boolean> => {
        const response = await this.api.delete(`user/${userId}`);
        return response.success;
    }
}

export default UserApi;
