import TranslatePhraseResponse from "../../services/letrans-api/models/response/translate-phrase.response";
import NullableType from "../../types/nullable.type";

type TranslatorResultPropsType = {
    translation: NullableType<TranslatePhraseResponse>;
}

export default TranslatorResultPropsType;
