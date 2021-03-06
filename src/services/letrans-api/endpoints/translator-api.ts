import ApiResponse from "../../../types/api-response.type";
import NullableType from "../../../types/nullable.type";
import ApiService from "../api.service";
import LanguageResponse from "../models/response/language.response";
import TranslatePhraseRequest from "../models/request/translate-phrase.request";
import TranslatePhraseResponse from "../models/response/translate-phrase.response";
import UserTranslationResponse from "../models/response/user-translation.response";
import UserTranslationRequest from "../models/request/user-translation.request";

class TranslatorApi {
    private apiService: ApiService = new ApiService();

    public getLanguages = async (): Promise<LanguageResponse[]> => {
        const response: ApiResponse = await this.apiService.get(`translator/languages`);
        return response.success ? response.data : [];
    }

    public translate = async (translateData: TranslatePhraseRequest): Promise<NullableType<TranslatePhraseResponse>> => {
        const response: ApiResponse = await this.apiService.post(`translator/translate`, translateData);
        return response.success ? response.data as TranslatePhraseResponse : null;
    }

    public getUserTranslations = async (): Promise<UserTranslationResponse[]> => {
        const response: ApiResponse = await this.apiService.get(`translator/user-translation`);
        return response.success ? response.data as UserTranslationResponse[] : [];
    }

    public putUserTranslation = async (userTranslationData: UserTranslationRequest): Promise<boolean> => {
        const response: ApiResponse = await this.apiService.put(`translator/user-translation`, userTranslationData);
        return response.success;
    }

    public deleteUserTranslation = async (id: string): Promise<boolean> => {
        const response: ApiResponse = await this.apiService.delete(`translator/user-translation/${id}`);
        return response.success;
    }
}

export default TranslatorApi;
