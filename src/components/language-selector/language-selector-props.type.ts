import ChangeEventFunctionType from "../../types/change-event-function.type";

type PropsLanguageSelectorType = {
    onChangeFn: ChangeEventFunctionType;
    currentValue: string;
    name: string;
    id: string;
}

export default PropsLanguageSelectorType;
