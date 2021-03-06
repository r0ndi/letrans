import NullableType from "../../types/nullable.type";
import AuthApi from "./endpoints/auth-api";
import TranslatorApi from "./endpoints/translator-api";
import UserApi from "./endpoints/user-api";
import LanguageResponse from "./models/response/language.response";

class LetransService {
    public user: UserApi = new UserApi();
    public auth: AuthApi = new AuthApi();
    public translator: TranslatorApi = new TranslatorApi();

    public getDefaultLanguage = async (ignoredLanguage: NullableType<LanguageResponse> = null): Promise<NullableType<LanguageResponse>> => {
        let languages = await this.translator.getLanguages();
        languages = languages.filter((language: LanguageResponse) => {
            return ignoredLanguage === null || language.id !== ignoredLanguage.id
        });

        return languages.length > 0 ? languages[0] : null;
    }
}

export default LetransService;
