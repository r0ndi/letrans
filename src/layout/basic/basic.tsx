import React from 'react';
import { Grid } from "@material-ui/core";
import useBasicStyles from './basic-style';
import ApplicationTitle from '../../components/application-title/application-title';
import BasicPropsType from './basic-props.type';

const Basic = (props: BasicPropsType) => {
    const styles = useBasicStyles();

    return <>
        <Grid container spacing={2} className={styles.pageContainer}>

            <Grid item xs={12} md={6} className={styles.leftSideBox}>
                <ApplicationTitle />
            </Grid>

            <Grid item xs={12} md={6}>
                {props.children}
            </Grid>

        </Grid>
    </>;
}

export default Basic;
