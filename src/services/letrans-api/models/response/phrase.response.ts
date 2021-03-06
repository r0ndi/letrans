interface PhraseResponse {
    id: string;
    translations: Array<{
        id: string;
        translation: string;
    }>;
}

export default PhraseResponse;
