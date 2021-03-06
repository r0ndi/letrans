import LanguageResponse from "./language.response";

interface TranslatePhraseResponse {
    phrase: string;
    phraseId: string;
    translation: string;
    sourceLanguage: LanguageResponse;
    targetLanguage: LanguageResponse
}

export default TranslatePhraseResponse;
