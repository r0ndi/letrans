import UserTranslateStatusEnum from "../../utils/user-translate-status.enum";
import LanguageResponse from "./language.response";
import PhraseResponse from "./phrase.response";
import UserTranslationLanguageResponse from "./user-translation-language.response";
import UserResponse from "./user.response";

interface UserTranslationResponse {
    id: string;
    user: UserResponse;
    phrase: PhraseResponse;
    status: UserTranslateStatusEnum;
    languages: UserTranslationLanguageResponse[];
}

export default UserTranslationResponse;
