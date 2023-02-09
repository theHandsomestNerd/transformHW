import React, {FunctionComponent, useContext} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Button, Grid, Typography, useMediaQuery} from '@material-ui/core'
import {urlFor} from '../block-content-ui/static-pages/cmsStaticPagesClient'
import {ThwHeadlineSectionType, ThwMottoSectionType} from "../BlockContentTypes";
import {Parallax} from 'react-parallax';
import {useThwStyles} from "./pages/Styles";
import clsx from "clsx";
import mediaQueries from "../../utils/mediaQueries";
import TransformHWTheme from "../../theme/transform-hw/TransformHWTheme";
import PageContext from "../page-context/PageContext";
import MediaQueriesContext from "../media-queries-context/MediaQueriesContext";
import firebaseAnalyticsClient from "../../common/firebase/FirebaseAnalyticsClient";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '430px',
        // backgroundColor: theme.palette.background.paper,
        paddingBottom: theme.spacing(5)
    },
    contentBullets: {
        // border: "1px solid black"
        marginBottom: theme.spacing(5)
    }
}))


interface IProps {
    sectionData: ThwHeadlineSectionType
}

const ThwHeadlineSection: FunctionComponent<IProps> = (props) => {
    const classes = useStyles()
    const mediaQueriesContext = useContext(MediaQueriesContext)

    const pageContext = useContext(PageContext);

    return (
        <Grid container item>
            <Grid container alignItems='center' alignContent='center' item
                  style={{ padding: "40px"}} md={8}>
                <Typography variant={'h2'} style={{color: '#FAFAFA'}}>
                    {props.sectionData.contentText}
                </Typography>
            </Grid>
            <Grid container item justifyContent={mediaQueriesContext.smDown?'center':'flex-end'} alignItems='center' alignContent='center' md={4} style={{ padding: "40px"}}>
                <Button color='primary' variant='contained'
                        onClick={() => {
                            firebaseAnalyticsClient.ctaClick("hero-section", props.sectionData.ctaButtonText, pageContext.analyticsId,)
                        }}
                        href={props.sectionData.ctaButtonLink ?? ""}>
                    <Typography variant='button'
                                color='secondary'>{props.sectionData.ctaButtonText}</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default ThwHeadlineSection