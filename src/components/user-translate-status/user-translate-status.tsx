import { Chip } from "@material-ui/core";
import React from "react";
import UserTranslateStatusEnum from "../../services/letrans-api/utils/user-translate-status.enum";
import UserTranslateStatusProps from "./user-translate-status-props.type";
import useUserTranslateStatusStyles from "./user-translate-status.styles";

const UserTranslateStatus = (props: UserTranslateStatusProps) => {
    const styles = useUserTranslateStatusStyles();

    switch (props.status) {
        case UserTranslateStatusEnum.ERROR:
        case UserTranslateStatusEnum.DELETED:
            return <Chip color="secondary" size="small" label={props.status} />;
        case UserTranslateStatusEnum.DONE:
            return <Chip className={styles.success} size="small" label={props.status} />;
        case UserTranslateStatusEnum.TRIED:
            return <Chip color="default" size="small" label={props.status} />;
        default:
        case UserTranslateStatusEnum.NEW:
            return <Chip color="primary" size="small" label={props.status} />;
    }
}

export default UserTranslateStatus;
