import { ChangeEvent, ReactNode } from "react";
import IndefinableType from "./indefinable.type";

type ChangeEventFunctionType = (
    event: ChangeEvent<{
        name?: IndefinableType<string>;
        value: unknown;
    }>,
    child: ReactNode
) => void;

export default ChangeEventFunctionType;
