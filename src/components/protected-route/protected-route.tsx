import { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../contexts/user-context/user-context";
import ProtectedRoutePropsType from "./protected-route-props.type";

const ProtectedRoute = (props: ProtectedRoutePropsType) => {
    const userContext = useContext(UserContext);
    const Component = props.component;

    return userContext.user !== null ? <Component /> : <Redirect to={{ pathname: '/login' }} />;
}

export default ProtectedRoute;
