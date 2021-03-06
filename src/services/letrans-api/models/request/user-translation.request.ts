import UserTranslateStatusEnum from "../../utils/user-translate-status.enum";

interface UserTranslationRequest {
    phraseId: string;
    languages: string[];
    status: UserTranslateStatusEnum;
}

export default UserTranslationRequest;
